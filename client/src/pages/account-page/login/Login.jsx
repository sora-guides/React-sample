import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

import Button from '../../../components/button/Button'

import './Login.scss'


export default function Login() {
    const { login } = useAuth()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        login(email, password)
        navigate("/")
    }, [ email, password ])

    return (
        <div className="login">
            <div className="container">
                <div className="login-row">
                    <div className="login-form">
                        <h2 className="login-form__title">Hello again</h2>
                        <form className="login-form__form" onSubmit={ handleSubmit }>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                className="form__input"
                                value={ email }
                                onChange={ (event) => { setEmail(event.target.value) } }
                            />
                            <input 
                                type={ !showPassword ? "password" : "text" } 
                                placeholder="Password" 
                                className="form__input"
                                value={ password }
                                onChange={ (event) => { setPassword(event.target.value) } }
                            /> 
                            <br />
                            <label htmlFor="control" className="show-password">
                                <input 
                                    type="checkbox" 
                                    id="control"
                                    checked={ showPassword }
                                    className="form__show-password"
                                    onChange={ () => { setShowPassword(!showPassword) } }
                                /> 
                                Show password
                                
                                <Link to="/signup">
                                    <span className="create-account">Don't have any account?</span>
                                </Link>
                                <br />
                            </label>
                            <Button className="btn-large" type="Submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                    <div className="side-background" />
                </div>
            </div>
        </div>
    )
}