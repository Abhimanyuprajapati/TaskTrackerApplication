import React from 'react';

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

const linkHoverStyle = {
  textDecoration: 'underline',
};

function Privacy() {
  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Privacy Statement</h2>

        <p style={paragraphStyle}><strong>1. Introduction</strong></p>
        <p style={paragraphStyle}>We value your privacy. This Privacy Statement explains how we collect, use, and protect your personal information when you use our website.</p>

        <p style={paragraphStyle}><strong>2. Information We Collect</strong></p>
        <p style={paragraphStyle}>We collect personal information that you provide when you use our services, such as your name, email address, username, and any other information you provide when registering or filling out forms.</p>

        <p style={paragraphStyle}><strong>3. Use of Your Information</strong></p>
        <p style={paragraphStyle}>We use the information we collect to provide and improve our services, communicate with you, and send you promotional content, if applicable. We do not sell your personal data to third parties.</p>

        <p style={paragraphStyle}><strong>4. Data Retention</strong></p>
        <p style={paragraphStyle}>We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, and resolve disputes.</p>

        <p style={paragraphStyle}><strong>5. Data Protection</strong></p>
        <p style={paragraphStyle}>We take reasonable measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of data transmission over the internet is completely secure.</p>

        <p style={paragraphStyle}><strong>6. Cookies</strong></p>
        <p style={paragraphStyle}>Our website uses cookies to enhance your experience and to gather information about how you use our website. You can adjust your browser settings to refuse cookies, but this may affect the functionality of some parts of the website.</p>

        <p style={paragraphStyle}><strong>7. Third-Party Links</strong></p>
        <p style={paragraphStyle}>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.</p>

        <p style={paragraphStyle}><strong>8. Your Rights</strong></p>
        <p style={paragraphStyle}>You have the right to access, update, or delete your personal information. You may also object to the processing of your data or withdraw your consent at any time.</p>

        <p style={paragraphStyle}><strong>9. Changes to this Privacy Statement</strong></p>
        <p style={paragraphStyle}>We may update this Privacy Statement from time to time. We will notify you of significant changes, but you should periodically review this statement for any updates.</p>

        <p style={paragraphStyle}><strong>10. Contact Information</strong></p>
        <p style={paragraphStyle}>If you have any questions or concerns about our Privacy Statement or how we handle your personal data, please contact us at: support@yourwebsite.com</p>
      </div>

      <div style={footerStyle}>
        <p>
          <a href="/terms" style={linkStyle}>Terms of Use</a> |{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/" style={linkStyle}>About</a> |{' '}
          <a href="/login" style={linkStyle}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Privacy;
