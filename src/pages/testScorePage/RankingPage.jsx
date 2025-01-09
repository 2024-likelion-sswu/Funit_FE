import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import icon from '../../assets/img/character/side.png';

import pink from '../../assets/img/character/pink.png';
import skyblue from '../../assets/img/character/skyblue.png';
import yelloweye from '../../assets/img/character/yelloweye.png';
import gray from '../../assets/img/character/gray.png';
import mint from '../../assets/img/character/mint.png';
import purpleeye from '../../assets/img/character/purpleeye.png';

const RankingPage = () => {

  const navigate = useNavigate();

  const [rankings, setRankings] = useState([]); // 랭킹 데이터
  const [nickname, setNickname] = useState(''); // 유저 닉네임

  const characterImages = [pink, skyblue, yelloweye,purpleeye, gray, mint];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 유저 정보 가져오기
        const userResponse = await axios.get('https://dreamcatcherrr.store/api/users/me');
        const userId = userResponse.data.id;
        setNickname(userResponse.data.nickname);

        // 랭킹 데이터 가져오기
        const rankingsResponse = await axios.get(`https://dreamcatcherrr.store/api/record/leaderboard?createdBy=${userId}`);
        setRankings(rankingsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        alert('데이터를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchData();
  }, []);


  const handleLetterClick = (nickname) => {
    navigate('/letterCreate', { state: { recipientNickname: nickname } });
  };

  const handleShareClick = () => {
    navigate('/urlShare');
  };


  return (
    <div className='container ranking-container'>
      <div className="ranking-header">
        <img src={icon} alt="상단아이콘" />
        <p>
          누가 나를 가장 잘 알고 있을까요?<br />
          친구들의 순위를 확인하세요!
        </p>
      </div>

      {/* 랭킹 리스트 */}
      <div className="ranking-list">
        {rankings.map((rank, index) => (
          <div key={index} className={`ranking-item rank-${index + 1}`}>
            <div className="ranking-avatar">
              <img
                src={characterImages[index % characterImages.length]}
              />
            </div>
            <div className="ranking-details">
              <div className="nickname-container">
                <p className="nickname">
                  ({nickname})님의 찐친!<br />
                  <h1>{rank.testedByNickname}</h1>
                </p>
                <button className={`send-letter-btn ${rank.score >= 6 ? 'show' : ''}`} onClick={() => handleLetterClick(rank.testedByNickname)}>
                  편지 보내기
                </button>
              </div>
              <p className="score"><span style={{color:"#FF7F71"}}>{rank.score}</span>점</p>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed-footer">
        <Button title="테스트 더 공유하기" onClick={handleShareClick} />
    </div>
    </div>
  );
};

export default RankingPage
