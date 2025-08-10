import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  return (

    <Router>
      <Routes>
        <Route index element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/assessment" element={<ProtectedRoutes><Assessment /></ProtectedRoutes>} />
        <Route path="/results" element={<ProtectedRoutes><Results /></ProtectedRoutes>} />
      </Routes>
    </Router>
  )
}

export default App