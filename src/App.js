import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'
import UrlF from './pages/mainPage/UrlFriend'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/' element={<UrlF />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
