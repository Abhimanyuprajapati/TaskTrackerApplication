import React, { useState } from 'react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Simple email validation
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
    return newErrors;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: Implement actual reset logic (API call)
    setSubmitted(true);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      backgroundColor: '#f4f4f4'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: 400
      }}>
        <h2 style={{ textAlign: 'center', color: '#0098CA' }}>Forgot Password</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: 15 }}>
            <label htmlFor="email" style={{ fontSize: 14, color: '#333' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                fontSize: 14,
                border: '1px solid #ccc',
                borderRadius: 4,
                boxSizing: 'border-box'
              }}
            />
            <div className="error" style={{ color: 'red', fontSize: 12 }}>
              {errors.email}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 15 }}>
            <input
              type="submit"
              value="Reset Password"
              style={{
                width: '100%',
                padding: 10,
                fontSize: 14,
                border: 'none',
                borderRadius: 4,
                backgroundColor: '#0098CA',
                color: '#fff',
                cursor: 'pointer'
              }}
            />
          </div>
          {submitted && (
            <div style={{ color: 'green', fontSize: 13, textAlign: 'center', marginBottom: 10 }}>
              If this email is registered, you will receive reset instructions.
            </div>
          )}
        </form>
        <div className="footer" style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#333' }}>
          <p><a href="/login" style={{ color: '#0098CA', textDecoration: 'none' }}>Back to Login</a></p>
          <p>
            <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/" style={{ color: '#0098CA', textDecoration: 'none' }}>About</a> |{' '}
            <a href="/terms" style={{ color: '#0098CA', textDecoration: 'none' }}>Terms of Use</a> |{' '}
            <a href="/privacy" style={{ color: '#0098CA', textDecoration: 'none' }}>Privacy Statement</a>
          </p>
        </div>
      </div>
    </div>
  );
}

