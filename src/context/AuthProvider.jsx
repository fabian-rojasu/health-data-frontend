import { useState, useEffect, createContext } from "react";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const authUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // const { data } = await 
//         setAuth(data);
//       } catch (error) {
//         console.log(error);
//         setAuth({});
//       } finally {
//         setLoading(false);
//       }
//     };
//     authUser();
//   }, []);

  const closeSession = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        closeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
