import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import ProtectedRoutes from './components/ProtectedRoutes';
import LoginForm from './pages/auth/Login';
import OTPVerificationForm from './pages/auth/OTPForm';
import RegisterForm from './pages/auth/Register';
import ForgotPasswordForm from './pages/auth/ForgetPassword';

function App() {

  return (

    <Router>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/otp" element={<OTPVerificationForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/assessment" element={<ProtectedRoutes><Assessment /></ProtectedRoutes>} />
        <Route path="/results" element={<ProtectedRoutes><Results /></ProtectedRoutes>} />
      </Routes>
    </Router>
  )
}

export default App