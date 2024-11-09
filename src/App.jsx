import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthProvider";
import { Dashboard } from "./pages/Dashboard";
import { ModalProvider } from "./context/ModalProvider";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import Home from "./pages/home";
import { Profile } from "./pages/Profile";
import ModalImportData  from "./components/ModalImportData";
import { useState } from "react";

function App() {
  const [dataImportFlag, setDataImportFlag] = useState(0);

  const handleDataImported = () => {
    setDataImportFlag(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Dashboard dataImportFlag={dataImportFlag} />} />
              <Route path="/profile" element={<Profile/>} />
            </Route>    
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
          <ModalImportData onDataImported={handleDataImported} />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
