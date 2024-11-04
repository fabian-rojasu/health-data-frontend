
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login  from './pages/Login';
import Register  from './pages/Register';
import { AuthProvider } from './context/AuthProvider';
import { Dashboard } from './pages/Dashboard';

import { ProtectedRoute } from './layouts/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;