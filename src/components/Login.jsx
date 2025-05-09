import React, { useState } from 'react';
import '../css/Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toaster from '../toaster/Toaster';

function Login() {
  const { login } = useAuth();
  const navigator = useNavigate(); // Use useNavigate from react-router-dom
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) newErrors.identifier = 'Email or Username is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await login(form);
      // If using axios, check for response status
      if (response.status === 200) {
        Toaster("Login successful", "success");
        navigator('/'); // Redirect to home page or dashboard
      } else {
        // Handle known server errors
        setServerError(response.response?.data?.message || 'Login failed.');
        Toaster("Login failed", "failure");
      }
    } catch (error) {
      setServerError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Email/Username</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter Email or Username"
            value={form.identifier}
            onChange={handleChange}
            required
          />
          <div className="error" id="identifierError">{errors.identifier}</div>
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

        {serverError && <div className="error">{serverError}</div>}

        <div className="form-group">
          <input type="submit" value={loading ? "Logging in..." : "Login"} disabled={loading} />
        </div>
      </form>

      <div className="footer">
        <p>
          New here? <a href="/verifyemail">Create an Account</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/">About</a> |{' '}
          {/* <a href="/contact">Contact Us</a> |{' '} */}
          <a href="/terms">Terms of Use</a> |{' '}
          <a href="/privacy">Privacy Statement</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
