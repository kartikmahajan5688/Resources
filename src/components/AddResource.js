import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "./App.css"

const AddResource = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        designation: '',
        password: '',
        confirmPassword: '',
        billable: 0,
        nonBillable: 0
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        designation: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        if (formData.designation === "") {
            errors.designation = "Select your designation"
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        else if (formData.password.length > 12) {
            errors.password = 'Password must be less than 12 characters';
            isValid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            fetch('http://localhost:3030/resources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));

            //reset form
            setFormData({
                name: '',
                email: '',
                designation: '',
                password: '',
                confirmPassword: ''
            });

            setFormErrors({
                name: '',
                email: '',
                designation: '',
                password: '',
                confirmPassword: '',
            })
            navigate('/resources');
        };
    }

    return (
        <>
            <Header />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className='register-heading'>
                        <h1>Add Resource</h1>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            name='name'
                            value={formData.name}
                            placeholder='Full Name'
                            onChange={handleChange}
                        />
                        {formErrors.name && <span className="error">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                        <select
                            placeholder='Select Your Designation'
                            name='designation'
                            value={formData.designation}
                            onChange={handleChange}
                        >
                            <option value="">Select Your Designation</option>
                            <option value="Partner">Partner</option>
                            <option value="Associate">Associate</option>
                            <option value="Senior Associate">Senior Associate</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {formErrors.designation && <span className="error">{formErrors.designation}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {formErrors.password && <span className="error">{formErrors.password}</span>}

                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            name='confirmPassword'
                            placeholder='Re-enter Password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                    </div>
                    <button type="submit" >Register</button>
                </form>
            </div>
        </>
    );
};


export default AddResource
