import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';

function UserForm({ user }) {
    const [formData, setFormData] = useState({
        name: user.name,
        billable: user.billable,
        nonBillable: user.nonBillable
    });

    const navigate = useNavigate();

    // function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3030/resources/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        console.log(data); // log the updated user data 
        navigate("/resources");
        window.location.reload();
    };

    // function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Modal>
            <form onSubmit={handleSubmit} id='updatedForm'>
                <label>
                    Name:
                    <input className='form-group' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Billable: 
                    <input className='form-group' type="number" name="billable" value={formData.billable} onChange={handleInputChange} />
                </label>
                <label>
                    Non- Billable: 
                    <input className='form-group' type="number" name="nonBillable" value={formData.nonBillable} onChange={handleInputChange} />
                </label>
                <button type="submit">Save</button>
                <button type="cancel">Cancel</button>
            </form>
        </Modal>
    );
}

export default UserForm;