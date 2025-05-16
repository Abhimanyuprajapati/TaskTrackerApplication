import React, { useState } from 'react';
import '../css/register.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toaster from '../toaster/Toaster';
import Otp from './Otp';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const { register, otpSender, verifyOTP } = useAuth();
  const navigator = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Username is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid.';
    if (!form.country) newErrors.country = 'Country is required.';
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

    if (!emailVerified) {
      Toaster("Please verify your email before registering.", "warning");
      return;
    }

    try {
      const response = await register(form);
      if (response.status === 201) {
        Toaster("Registration successful!", "success");
        navigator('/');
      } else {
        setErrors({ server: response.data.message || 'Registration failed.' });
      }
    } catch (error) {
      setErrors({ server: 'An unexpected error occurred.' });
    }
  };

  const handleSendOtp = async () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      Toaster("Please enter a valid email before requesting OTP", "error");
      return;
    }

    try {
      const response = await otpSender({ email: form.email });
      if (response.status === 200) {
        Toaster("OTP sent to email!", "success");
        setOtpModalOpen(true);
      }
      if (response.status === 400) {
        Toaster(response.data.message, "error");
      }
    } catch (error) {
      Toaster("Something went wrong", "error");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await verifyOTP({ email: form.email, otp });
      if (response.status === 200) {
        Toaster("Email verified successfully", "success");
        setEmailVerified(true);
        setOtpModalOpen(false);
      }
      if (response.status === 400 || response.status === 404) {
        Toaster(response.data.message, "error");
      }
    } catch (error) {
      Toaster("Something went wrong", "error");
    }
  };

  return (
    <div className="register">
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
            <div className="error">{errors.name}</div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div style={{ display: 'flex', gap: '0px' }}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                disabled={emailVerified}
                required
                style={{
                  flex: 1,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 'none',
                  padding: '10px'
                }}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={emailVerified || !/\S+@\S+\.\S+/.test(form.email)}
                style={{
                  backgroundColor: emailVerified ? '#4CAF50' : '#2196F3',
                  color: '#fff',
                  border: 'none',
                  padding: '0 12px',
                  cursor: emailVerified ? 'default' : 'pointer'
                }}
              >
                {emailVerified ? 'Verified' : 'Verify'}
              </button>
            </div>
            <div className="error">{errors.email}</div>
          </div>


          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter Country"
              value={form.country}
              onChange={handleChange}
              required
            />
            <div className="error">{errors.country}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#555'
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="error">{errors.password}</div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value={emailVerified ? "Register" : "Verify email to register"}
              disabled={!emailVerified}
              style={{
                backgroundColor: emailVerified ? "#4CAF50" : "#ccc",
                cursor: emailVerified ? "pointer" : "not-allowed"
              }}
            />
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

      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
            <h3 className="text-lg font-semibold mb-8 text-center">
              Enter OTP sent to <span className="text-blue-600">{form.email}</span>
            </h3>

            <Otp length={6} onOtpSubmit={(otp) => setOtp(otp)} />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleOtpSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setOtpModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
export default Register;