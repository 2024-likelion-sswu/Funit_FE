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

  const [rankings, setRankings] = useState([]); // Ranking data
  const [nickname, setNickname] = useState(''); // User nickname

  const characterImages = [pink, skyblue, yelloweye, purpleeye, gray, mint];

  // 쿠키 값
  const COOKIE_VALUE = 'JSESSIONID=B9890CE61180410FA1D911C8B048386E';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보 요청
        const userResponse = await axios.get('https://dreamcatcherrr.store/api/auth/me', {
          headers: {
            Cookie: COOKIE_VALUE, // 쿠키 값 추가
          },
          withCredentials: true, // 쿠키 포함
        });

        const userId = userResponse.data.id;
        setNickname(userResponse.data.nickname);

        // 랭킹 데이터 요청
        const rankingsResponse = await axios.get(`https://dreamcatcherrr.store/api/record/leaderboard?createdBy=${userId}`, {
          headers: {
            Cookie: COOKIE_VALUE, // 쿠키 값 추가
          },
          withCredentials: true, // 쿠키 포함
        });

        setRankings(rankingsResponse.data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert('인증되지 않았습니다. 로그인 상태를 확인하세요.');
        } else {
          console.error('Error fetching data:', error);
          alert('데이터를 불러오는 중 문제가 발생했습니다.');
        }
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

      {/* Ranking list */}
      <div className="ranking-list">
        {rankings.map((rank, index) => (
          <div key={index} className={`ranking-item rank-${index + 1}`}>
            <div className="ranking-avatar">
              <img
                src={characterImages[index % characterImages.length]}
                alt="캐릭터 이미지"
              />
            </div>
            <div className="ranking-details">
              <div className="nickname-container">
                <p className="nickname">
                  ({nickname})님의 찐친!<br />
                  <h1>{rank.testedByNickname}</h1>
                </p>
                <button
                  className={`send-letter-btn ${rank.score >= 6 ? 'show' : ''}`}
                  onClick={() => handleLetterClick(rank.testedByNickname)}
                >
                  편지 보내기
                </button>
              </div>
              <p className="score">
                <span style={{ color: '#FF7F71' }}>{rank.score}</span>점
              </p>
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

export default RankingPage;
