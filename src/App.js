import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'
import NicknamePage from './pages/testCreatePage/NicknamePage'
import OnboardingPage from './pages/testCreatePage/OnboardingPage'
import TestCreatePage from './pages/testCreatePage/TestCreatePage'
import UrlF from './pages/mainPage/UrlFriend'
import Score1Page from './pages/testScorePage/Score1Page'
import Score2Page from './pages/testScorePage/Score2Page'
import Score3Page from './pages/testScorePage/Score3Page'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/nickname' element={<NicknamePage />} />
                <Route path='/onboarding' element={<OnboardingPage />} />
                <Route path='/testCreate' element={<TestCreatePage />} />
                <Route path='/urlfriend' element={<UrlF />} />
                <Route path ='/score1' element={<Score1Page/>} />
                <Route path ='/score2' element={<Score2Page/>} />
                <Route path ='/score3' element={<Score3Page/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
