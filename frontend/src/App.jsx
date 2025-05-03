import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Register from './components/register';
import Privacy from './components/privacy';
import Terms from './components/Terms';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './container/Dashboard';

function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* // Procted route */}
      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
      </Route>
    
    </Routes>
    </>
  )
}

export default App
