import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de verificación de autenticación
    const token = localStorage.getItem('token');
    if (token) {
      // Suponiendo que tienes un endpoint para obtener el usuario
      setAuth({ userId: token });
    }
    setLoading(false); // Loading termina al completar el proceso
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

