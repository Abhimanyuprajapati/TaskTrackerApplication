import React, { useState } from 'react';
import '../css/register.css'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Register() {
    const { register } = useAuth(); // Assuming you have a register function in your AuthContext
    const navigator = useNavigate(); // Use useNavigate from react-router-dom
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Simple client-side validation
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Username is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.country) newErrors.country = 'country is required.';

    // Basic email pattern check
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call the register function from AuthContext
    try {
      const response = await register(form);
      console.log("response",response)
      if (response.status === 201) {
        alert('Registration successful!'); // Handle successful registration
        navigator('/'); // Redirect to login page
      } else {
        setErrors({ server: response.data.message || 'Registration failed.' });
      }
    } catch (error) {
      setErrors({ server: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="Register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Username"
            value={form.name}
            onChange={handleChange}
            required
          />
          <div className="error" id="usernameError">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="error" id="emailError">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="country"
            id="country"
            name="country"
            placeholder="Enter Country"
            value={form.country}
            onChange={handleChange}
            required
          />
          <div className="error" id="countryError">{errors.country}</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="error" id="passwordError">{errors.password}</div>
        </div>

        <div className="form-group">
          <input type="submit" value="Register" />
        </div>
      </form>

      <div className="footer">
        <p><a href="/login">Already have an account? Login here</a></p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/">About</a> |{' '}
          <a href="/terms">Terms of Use</a> |{' '}
          <a href="/privacy">Privacy Statement</a>
        </p>
      </div>
    </div>
  );
}

export default Register;