import { createContext, useState, useEffect } from "react";
import checkAuthStatus from "../utils/checkAuthStatus";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function checkAuth() {
        try {
            console.log("checking auth")
            setLoading(true);
            const response = await checkAuthStatus();
            setIsLoggedIn(response.isLoggedIn);
        } catch (err) {
            console.error("Error checking authentication status:", err);
            setError(err);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, checkAuth, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
