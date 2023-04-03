import { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaCalendarAlt, FaCoins } from 'react-icons/fa'
import { MdOutlineMoneyOff } from 'react-icons/md'
import UserForm from './UserForm';
import "./App.css"
import Header from './Header';

const Resources = () => {

    const [resources, setResources] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    //getAllResources
    const getData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch("http://localhost:3030/resources", requestOptions)
            .then((response) => response.json())
            .then((result) => setResources(result))
            .catch((error) => console.log("error", error));
    };

    //Edit Selected Resource
    const handleUserClick = (resource) => {
        setSelectedUser(resource);
    };

    //deleteResource
    const handleDeleteResource = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/resources/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Remove the deleted resource from the resources state array
            const updatedResources = resources.filter((resource) => resource.id !== id);
            setResources(updatedResources);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(resources);

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Header />
            {/* <p id='resourceHeading'>Resources</p> */}
            <div className='form-container'>
                {resources.length <= 0 && 
                    <div style={{"marginTop":"5rem"}}>
                    <p>No resources found. Kindly add new resource!! </p>
                    </div>
                }

                {resources.length > 0 && resources.map((resource) => (
                    <li key={resource.id}>
                        <div className='resources'>
                            <div className='upper-div'>
                                <div className='left-upper'>
                                    <h4><span>{resource.name}</span> - {resource.designation}</h4>
                                    <p id='resEmail'>{resource.email}</p>
                                </div>
                                <div className='right-upper'>
                                    <CiEdit
                                        size="20px"
                                        color="black"
                                        id='editBtn'
                                        onClick={() => handleUserClick(resource)}
                                    />
                                    <RiDeleteBinLine
                                        size="20px"
                                        color="black"
                                        id='deleteBtn'
                                        value={resource.id}
                                        onClick={() => handleDeleteResource(resource.id)}
                                    />
                                </div>
                            </div>
                            <div className='lower-div'>
                                <div className='first-lower'>
                                    <div className='left-lower'>
                                        <FaCalendarAlt size="20px" color="black" id='calendar' />
                                    </div>
                                    <div className='right-lower'>
                                        <p>Today</p>
                                        <p><b>10</b> hr</p>
                                    </div>
                                </div>
                                <div className='first-lower'>
                                    <div className='left-lower'>
                                        <FaCoins size="20px" color="black" id='coins' />
                                    </div>
                                    <div className='right-lower'>
                                        <p>Billable</p>
                                        <p><b>{resource.billable}</b> hr</p>
                                    </div>
                                </div>
                                <div className='first-lower'>
                                    <div className='left-lower'>
                                        <MdOutlineMoneyOff size="20px" color="black" id='moneyOff' />
                                    </div>
                                    <div className='right-lower'>
                                        <p>Non-Billable</p>
                                        <p><b>{resource.nonBillable}</b> hr</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}

                {/* UserForm for edit the details of selected user*/}
                {selectedUser && <UserForm user={selectedUser} />}
            </div>
        </>
    )
}

export default Resources