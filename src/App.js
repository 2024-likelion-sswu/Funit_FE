import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'
import NicknamePage from './pages/testCreatePage/NicknamePage'
import UrlF from './pages/mainPage/UrlFriend'
import Score1Page from './pages/testScorePage/Score1Page'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/nickname' element={<NicknamePage />} />
                <Route path='/urlfriend' element={<UrlF />} />
                <Route path ='/score1' element={<Score1Page/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
