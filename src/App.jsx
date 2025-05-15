import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Register from './components/register';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './services/ProtectedRoute';
import { ProjectDetail } from './components/ProjectDetail';
import { Dashboard } from './components/Dashboard';
import MainLayout from './container/MainLayout';
import { Setting } from './components/Setting';
import { Help } from './components/Help';
import { SingleProject } from './components/SingleProject';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project" element={<ProjectDetail />} />
             <Route path="/project/:id" element={<SingleProject />} />
             <Route path="/settings" element={<Setting />} />
              <Route path="/help" element={<Help />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;




















// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Login from './components/Login';
// import Register from './components/register';
// import Privacy from './components/privacy';
// import Terms from './components/Terms';
// import ForgotPassword from './components/ForgotPassword';
// import ProtectedRoute from './services/ProtectedRoute';
// import Dashboard from './container/Dashboard';
// import { ProjectDetail } from './components/ProjectDetail';

// function App() {
//   return (
//     <>
//     <Toaster />
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/Privacy" element={<Privacy />} />
//       <Route path="/terms" element={<Terms />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* // Procted route */}
//       <Route element={<ProtectedRoute />}>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/project" element={<ProjectDetail />} />
//       </Route>
    
//     </Routes>
//     </>
//   )
// }

// export default App
