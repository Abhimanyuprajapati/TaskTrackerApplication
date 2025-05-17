import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toaster from '../toaster/Toaster';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const { login } = useAuth();
  const navigator = useNavigate();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      if (response.status === 200) {
        Toaster("Login successful", "success");
        navigator('/');
      } else {
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
 
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-500 to-blue-500">


      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              placeholder="Enter Email or Username"
              value={form.identifier}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {serverError && <div className="text-red-600 text-sm text-center">{serverError}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600 space-y-2">
          <p>
            New here?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Create an Account
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </p>
          <p className="text-xs mt-2">
            <a href="https://abhimanyuprajapati.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              About
            </a>{' '}
            |{' '}
            <a href="/terms" className="hover:underline">
              Terms of Use
            </a>{' '}
            |{' '}
            <a href="/privacy" className="hover:underline">
              Privacy Statement
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;














// import React, { useState } from 'react';
// import '../css/login.css';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Toaster from '../toaster/Toaster';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// // export const Login = () => {
//   function Login() {
//   const { login } = useAuth();
//   const navigator = useNavigate(); // Use useNavigate from react-router-dom
//   const [form, setForm] = useState({ identifier: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!form.identifier) newErrors.identifier = 'Email or Username is required.';
//     if (!form.password) newErrors.password = 'Password is required.';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//     setServerError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError('');
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await login(form);
//       // If using axios, check for response status
//       if (response.status === 200) {
//         Toaster("Login successful", "success");
//         navigator('/'); // Redirect to home page or dashboard
//       } else {
//         // Handle known server errors
//         setServerError(response.response?.data?.message || 'Login failed.');
//         Toaster("Login failed", "failure");
//       }
//     } catch (error) {
//       setServerError('An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='login'>
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="identifier">Email/Username</label>
//           <input
//             type="text"
//             id="identifier"
//             name="identifier"
//             placeholder="Enter Email or Username"
//             value={form.identifier}
//             onChange={handleChange}
//             required
//           />
//           <div className="error" id="identifierError">{errors.identifier}</div>
//         </div>

//           <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <div style={{ position: 'relative' }}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               name="password"
//               placeholder="Enter Password"
//                value={form.password}
//             onChange={handleChange}
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: 'absolute',
//                 right: '10px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 cursor: 'pointer',
//                 color: '#555'
//               }}
//             >
//                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//           </div>
//           <div className="error">{errors.password}</div>
//         </div>

//         {serverError && <div className="error">{serverError}</div>}

//         <div className="form-group">
//           <input type="submit" value={loading ? "Logging in..." : "Login"} disabled={loading} />
//         </div>
//       </form>

//       <div className="footer">
//         <p>
//           New here? <a href="/register">Create an Account</a>
//         </p>
//         <p>
//           <a href="/forgot-password">Forgot Password?</a>
//         </p>
//         <p>
//           <a target="_blank" rel="noopener noreferrer" href="https://abhimanyuprajapati.netlify.app/">About</a> |{' '}
//           {/* <a href="/contact">Contact Us</a> |{' '} */}
//           <a href="/terms">Terms of Use</a> |{' '}
//           <a href="/privacy">Privacy Statement</a>
//         </p>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Login;