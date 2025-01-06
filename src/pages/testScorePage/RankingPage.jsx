import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // 임시 랭킹 데이터
  const [rankings, setRankings] = useState([]);
  const [nickname, setNickname] = useState('Guest');

  const characterImages = [pink, skyblue, yelloweye,purpleeye, gray, mint];

  useEffect(() => {
    // 하드코딩된 임시 데이터
    const mockData = [
      { testedByNickname: '친구1', score: 9 },
      { testedByNickname: '친구2', score: 8 },
      { testedByNickname: 'k444', score: 0 },
      { testedByNickname: '777', score: 6 },
      { testedByNickname: '99', score: 4 },
      { testedByNickname: '88', score: 4 },
      { testedByNickname: '친구3', score: 4 },
    ];

    // rankings 상태 설정
    setRankings(mockData);
  }, []);

  const handleLetterClick = (nickname) => {
    navigate('/letterCreate', { state: { recipientNickname: nickname } });
  };

  // 테스트 공유 버튼 클릭 핸들러
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
