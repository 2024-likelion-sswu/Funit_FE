import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'
import NicknamePage from './pages/testCreatePage/NicknamePage'
import UrlF from './pages/mainPage/UrlFriend'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/nickname' element={<NicknamePage />} />
                <Route path='/' element={<UrlF />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
