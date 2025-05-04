import { useState , useEffect , createContext , useContext } from "react";
import { getProfile , login , logout , register } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(null);
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        // checking if user is already logged in
        const user = localStorage.getItem("user");
        if(user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false)
    } , [])

    const handleLogin = async (email , password) => {
        try {
            setError("");
            setLoading(true);
            const data = await login(email, password);
            setCurrentUser(data.user);
            setLoading(false);
            return data;
        } catch(err){
            setLoading(false);
            setError(err.message || "Failed to login");
            throw err;
        }
    }

    const handleRegister = async (name , email , password) => {
        try {
            setError("");
            setLoading(true);
            const data = await register(name , email , password);
            setCurrentUser(data.newUser);
            setLoading(false);
            return data;
        }catch(err){
            setLoading(false);
            setError(err.message || "failed to register");
            throw err;
        }
    }

    const handleLogout = async () => {
        logout();
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;