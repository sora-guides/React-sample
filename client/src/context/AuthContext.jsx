import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const baseUrl = "http://localhost:8000/api/v1/account/"

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch(baseUrl + "check-auth/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
    
                if (response.status === 401) {
                    setIsAuthenticated(false)
                } else {
                    setIsAuthenticated(true)
                }
            } catch(error) {
                console.log("Auth check failed: ", error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()
    }, [ ])

    async function login(email, password) {
        const response = await fetch(baseUrl + "login/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })

        if (!response.ok) {
            setIsAuthenticated(false)
            throw new Error("No active account found with this credentials", response.json())
        } 

        setIsAuthenticated(true)
        return response
    }

    async function logout() {
        try {
            await fetch(baseUrl + "logout/", {
                method: "POST",
                credentials: "include",
            })

            setIsAuthenticated(false)
        } catch (error) {
            console.log("An error occured while loging out: ", error)
        }
    }

    async function refreshToken() {
        const navigate = useNavigate()

        try {
            const response = await fetch(baseUrl + "refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Failed to refresh token")
            }
        } catch (error) {
            console.log("Error refreshing token: ", error)
            navigate("/login")
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)