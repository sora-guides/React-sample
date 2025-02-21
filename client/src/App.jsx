import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Main from './components/Main'
import Nav from './components/nav/Nav'
import Login from './pages/account-page/login/Login'
import NotFound from './pages/not-found/NotFound'

import './App.scss'

export default function App() {

    return (
        <Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Nav />
                    <Routes>
                        <Route path="/" element={ <Main /> } />
                        <Route path="/signup" element={ <div>Sign Up page</div> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </Fragment>
    )
}
