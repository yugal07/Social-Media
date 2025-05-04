import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom";
import { AuthProvider , useAuth } from "./context/AuthContext";
import { useState } from "react";
import Header from "./components/layout/Header";

const ProtectedRoute = ({children}) => {
  const {currentUser , loading} = useAuth();

  if(loading) return <div className="items-center flex justify-center">Loading</div>

  if(!currentUser) {
    return <Navigate to="/login" />
  }
  return children;
}

function App () {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Header />
        </div>
      </Router>
    </AuthProvider>
  )
}
export default App;