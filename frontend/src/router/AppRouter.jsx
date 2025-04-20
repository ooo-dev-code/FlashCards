import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import Login from '../pages/Login'
import Register from '../pages/Register'

import AddSet from '../pages/Set/AddSet'
import AddCard from '../pages/Set/AddCard'
import Game from '../pages/Set/Game'

function Router() {

    const { user, userLoaded } = useAuthContext();

    if (!userLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/addset" element={user ? <AddSet /> : <Navigate to="/" />} />
                <Route path="/addcard/:id" element={user ? <AddCard /> : <Navigate to="/" />} />
                <Route path="/game/:id" element={user ? <Game /> : <Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router
