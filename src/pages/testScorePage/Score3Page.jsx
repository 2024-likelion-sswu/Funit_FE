import React, {useState} from 'react'
import Button from '../../components/Button';
import icon from '../../assets/img/character/sad.png'

const Score3Page = () => {
    const [score, setScore] = useState(3); 
    const [nickname, setNickname] = useState('Guest');
    return (
        <div className='container score-container'>
            <h2><span style={{color:"#FF7F71"}}>{score}</span>점</h2>
            <h3>{nickname}님과 대화가 필요할 것 같아요 !</h3>
            <img src={icon} alt="3점" />
        </div>
    )
}

export default Score3Page



