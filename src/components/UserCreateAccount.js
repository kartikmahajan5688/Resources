import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

const UserCreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
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

  //Form validations
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters'
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
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
      fetch('http://localhost:3030/users', {
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
        password: '',
        confirmPassword: ''
      });

      setFormErrors({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    };
    navigate('/login')
  }


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className='register-heading'>
          <h1>Create admin account</h1>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name='name'
            value={formData.name}
            placeholder='Full Name'
            onChange={handleChange}
            required
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
            required
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
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
            required
          />
          {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
        </div>
        <button type="submit">Register</button>
        <div className='form-group'>
          <p>By Registering, you confirm that you accept our <a href='#termsOfUse'>Terms of Use</a> and <a href='#privacyPolicy'>Privacy Policy</a></p>
        </div>
        <div className='form-group reg-footer'>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default UserCreateAccount;
