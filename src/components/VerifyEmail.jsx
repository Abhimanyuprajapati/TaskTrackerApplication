import React, { useState } from 'react';
import '../css/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toaster from '../toaster/Toaster';

export const VerifyEmail = () => {
  const [form, setForm] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/send-otp', { email: form.email });
      Toaster("OTP sent to your email", "success");
      localStorage.setItem('emailForVerification', form.email);
      navigate('/verify-otp'); // Navigate to OTP input page
    } catch (err) {
      Toaster(err.response?.data?.message || "Failed to send OTP", "error");
    }
  };

  return (
    <div className="register">
      <div className="Register-container">
        <h2>Email Verification Required to Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="error" id="emailError">{errors.email}</div>
          </div>

          <div className="form-group">
            <input type="submit" value="Get OTP" />
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
    </div>
  );
};
