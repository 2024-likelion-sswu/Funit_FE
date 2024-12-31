import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
