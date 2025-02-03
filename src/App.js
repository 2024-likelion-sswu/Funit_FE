import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/mainPage/MainPage'
import NicknamePage from './pages/testCreatePage/NicknamePage'
import ChoosePage from './pages/mainPage/ChoosePage'
import OnboardingPage from './pages/testCreatePage/OnboardingPage'
import TestCreatePage from './pages/testCreatePage/TestCreatePage'
import OnboardingPage2 from './pages/testCreatePage/OnboardingPage2'
import TestCustomPage from './pages/testCreatePage/TestCustomPage'
import UrlSharePage from './pages/testCreatePage/UrlSharePage'
import UrlFriend from './pages/testPage/UrlFriend'
import FriendNamePage from './pages/testCreatePage/FriendNamePage'
import Score1Page from './pages/testScorePage/Score1Page'
import Score2Page from './pages/testScorePage/Score2Page'
import Score3Page from './pages/testScorePage/Score3Page'
import TestPage from './pages/testPage/TestPage'
import LetterCreatePage from './pages/letterPage/LetterCreatePage'
import RankingPage from './pages/testScorePage/RankingPage'
import LetterTreePage from './pages/letterPage/LetterTreePage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/nickname' element={<NicknamePage />} />
                <Route path='/choose' element={<ChoosePage />} />
                <Route path='/onboarding' element={<OnboardingPage />} />
                <Route path='/testCreate' element={<TestCreatePage />} />
                <Route path='/onboarding2' element={<OnboardingPage2 />} />
                <Route path='/testCustom' element={<TestCustomPage />} />
                <Route path='/urlShare' element={<UrlSharePage />} />
                <Route path='/friendNickname' element={<FriendNamePage />} />
                <Route path="/test/:userNickname" element={<TestPage />} />
                <Route path="/:userNickname" element={<UrlFriend />} /> 
                <Route path ='/score1' element={<Score1Page/>} />
                <Route path ='/score2' element={<Score2Page/>} />
                <Route path ='/score3' element={<Score3Page/>} />
                <Route path ='/test' element={<TestPage/>} />
                <Route path ='/letterCreate' element={<LetterCreatePage/>} />
                <Route path = '/ranking' element={<RankingPage/>}/>
                <Route path = '/tree' element={<LetterTreePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
