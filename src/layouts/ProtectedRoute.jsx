import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";

export const ProtectedRoute = () => {

  const { auth, loading } = useAuth();
  
  if ( loading ) return "Loading...";

  return (
    <>
        {auth ? (
            <div className="bg-gray-100 ">
              <Header/>
                <div className="md:flex md:min-h-screen">
                    <main className="flex-1 p-10">
                        <Outlet/>
                    </main>
                </div>
            </div>
        ) : <Navigate to="/"/>}
    </>
  )
}
