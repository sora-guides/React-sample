import { useState, useEffect, useCallback, Fragment } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Button from "../button/Button"

import './Nav.scss'


export default function Nav() {
    const { logout } = useAuth()
    const [ profile, setProfile ] = useState(null)
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            
            if (!response.ok) {
                throw new Error("HTTP error! Status: ", response.status)
            }

            if (response.status === 200) {
                const data = await response.json()
                setIsAuthenticated(true)
                setProfile(data)
            }
        } catch (error) {
            console.log("Error occured while getting profile: ", error.message, error.status)
            setIsAuthenticated(false)
        }
    }, [ ])

    useEffect(() => {
        fetchUser()
    }, [ fetchUser ])

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <Link to="/" className="logo">
                        <strong>Edu.</strong>Hub
                    </Link>
                    <ul className="nav-list">
                    { !isAuthenticated ? (
                        <Fragment>
                            <li className="nav-list__item">
                                <Link to="/login">
                                    <Button className="btn">Log in</Button>
                                </Link>
                            </li>
                            <li className="nav-list__item">
                                <Link to="/signup">
                                    <Button className="btn">Sign up</Button>
                                </Link>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li className="nav-list__item">
                                <Button>
                                    <img src={ profile.profile_photo } alt="user-pfp.image" className="btn-profile" />
                                </Button>
                            </li>
                        </Fragment>
                    ) }
                    </ul>
                </div>
            </div>
        </nav>
    )
}