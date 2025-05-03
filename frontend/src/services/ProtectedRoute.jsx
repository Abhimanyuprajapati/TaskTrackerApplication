// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token'); // or use context/auth state

//   return token ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;




import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // or use your auth context
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
