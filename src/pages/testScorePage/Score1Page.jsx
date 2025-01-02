import React, {useState} from 'react'
import Button from '../../components/Button';
import icon from '../../assets/img/character/mint.png'

const Score1Page = () => {
    const [score, setScore] = useState(10); 
    const [nickname, setNickname] = useState('Guest');
    return (
        <div className='container score-container'>
            <h2><span style={{color:"#FF7F71"}}>{score}</span>점</h2>
            <h3>{nickname}님과 통하는 사이 !</h3>
            <img src={icon} alt="10점" />
            <div className='alert'>
                <p>6점을 넘기면 친구에게 편지를 남길 수 있어요!</p>
            <Button title="편지 쓰러 가기"/>
            </div>
        </div>
    )
}

export default Score1Page



