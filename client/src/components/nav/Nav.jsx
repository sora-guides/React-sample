import { useState, useEffect, useCallback, Fragment } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast'
import Button from "../button/Button"

import './Nav.scss'


export default function Nav() {
    const { isAuthenticated, logout } = useAuth()
    const [ profile, setProfile ] = useState(null)
    const [ isOpen, setIsOpen ] = useState(false)
    
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
                setProfile(data)
            }
        } catch (error) {
            console.log("Error occured while getting profile: ", error.message, error.status)
        }
    }, [ ])

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            fetchUser()
        }
    }, [ isAuthenticated, fetchUser ])

    return (
        <nav className="nav">
            <Toaster />
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
                            { profile && (
                                <li className="nav-list__item">
                                    <Button onClick={ () => { setIsOpen(!isOpen) } }>
                                        <img src={ profile.profile_photo } alt="user-pfp.image" className="btn-profile" />
                                    </Button>
                                    { isOpen && (
                                        <div className="drop-down">
                                            <p className="drop-down__profile-name">{ profile.username }</p>
                                            <Button
                                                className="drop-down__btn"
                                                onClick={ () => { 
                                                    logout() 
                                                    setIsOpen(!isOpen)
                                                    toast("Good bye", { icon: "👋🏻" }) 
                                                } }
                                            >
                                                Log out
                                            </Button>
                                        </div>
                                    ) }
                                </li>
                            ) }
                        </Fragment>
                    ) }
                    </ul>
                </div>
            </div>
        </nav>
    )
}