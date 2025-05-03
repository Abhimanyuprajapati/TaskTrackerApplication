import React from 'react';

const bodyStyle = {
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 0,
  backgroundColor: '#f4f4f4',
};

const containerStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '800px',
  overflowY: 'auto',
  height: '80vh',
};

const headingStyle = {
  textAlign: 'center',
  color: '#0098CA',
};

const paragraphStyle = {
  color: '#333',
  fontSize: '14px',
  lineHeight: 1.6,
  marginBottom: '15px',
};

const footerStyle = {
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '12px',
  color: '#333',
};

const linkStyle = {
  color: '#0098CA',
  textDecoration: 'none',
};

function Terms() {
  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Terms of Use</h2>

        <p style={paragraphStyle}><strong>1. Introduction</strong></p>
        <p style={paragraphStyle}>These Terms of Use ("Terms") govern your use of our website and services. By using this website, you agree to comply with and be bound by these Terms.</p>

        <p style={paragraphStyle}><strong>2. Use of Service</strong></p>
        <p style={paragraphStyle}>You agree to use our services only for lawful purposes. You may not use the service in any way that could damage, disable, overburden, or impair the service, or interfere with any other user's use and enjoyment of the service.</p>

        <p style={paragraphStyle}><strong>3. User Account</strong></p>
        <p style={paragraphStyle}>If you create an account on our platform, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

        <p style={paragraphStyle}><strong>4. Content Ownership</strong></p>
        <p style={paragraphStyle}>All content provided on this website is owned by the company, unless otherwise specified. You may not copy, distribute, or modify any content without permission.</p>

        <p style={paragraphStyle}><strong>5. Privacy</strong></p>
        <p style={paragraphStyle}>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>

        <p style={paragraphStyle}><strong>6. Limitation of Liability</strong></p>
        <p style={paragraphStyle}>We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>

        <p style={paragraphStyle}><strong>7. Termination</strong></p>
        <p style={paragraphStyle}>We reserve the right to suspend or terminate your access to our services at our discretion, without notice, if you breach these Terms.</p>

        <p style={paragraphStyle}><strong>8. Changes to the Terms</strong></p>
        <p style={paragraphStyle}>We may update these Terms of Use from time to time. We will notify you of significant changes, but you should review the Terms periodically for updates.</p>

        <p style={paragraphStyle}><strong>9. Governing Law</strong></p>
        <p style={paragraphStyle}>These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law principles.</p>

        <p style={paragraphStyle}><strong>10. Contact Information</strong></p>
        <p style={paragraphStyle}>If you have any questions about these Terms, please contact us at: support@yourwebsite.com</p>
      </div>

      <div style={footerStyle}>
        <p>
          <a href="/privacy" style={linkStyle}>Privacy Statement</a> |{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/" style={linkStyle}>About</a> |{' '}
          <a href="/login" style={linkStyle}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Terms;
