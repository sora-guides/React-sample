import { useContext, createContext } from "react"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const baseUrl = "http://localhost:8000/api/v1/account/"

    async function login(email, password) {
        try {
            const response = await fetch(baseUrl + "login/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            })
            return response
        } catch (error) {
            console.log("Error during user login: ", error)
        }
    }

    async function logout() {
        try {
            await fetch(baseUrl + "logout/", {
                method: "POST",
                credentials: "include",
            })
        } catch (error) {
            console.log("An error occured while loging out: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)