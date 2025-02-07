import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import icon from '../../assets/img/character/side.png';
import axiosInstance from '../../apis/axiosInstance';

import pink from '../../assets/img/character/pink.png';
import skyblue from '../../assets/img/character/skyblue.png';
import yelloweye from '../../assets/img/character/yelloweye.png';
import gray from '../../assets/img/character/gray.png';
import purpleeye from '../../assets/img/character/purpleeye.png';

const RankingPage = () => {
  const navigate = useNavigate();

  const [rankings, setRankings] = useState([]); // 랭킹 데이터
  const [nickname, setNickname] = useState(''); // 유저 닉네임
  const [userId, setUserId] = useState(null); // 유저 ID

  const characterImages = [pink, skyblue, yelloweye, purpleeye, gray];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user ID using nickname...');
        // 닉네임 가져오기 (localStorage에서 저장된 값 사용)
        const storedNickname = localStorage.getItem('username');
        if (!storedNickname) {
          alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          navigate('/nickname');
          return;
        }
        setNickname(storedNickname);

        // 닉네임을 사용하여 유저 ID 가져오기
        const userResponse = await axiosInstance.get(`/api/users/${storedNickname}`);
        const fetchedUserId = userResponse.data.id;
        console.log('User ID fetched:', fetchedUserId);
        setUserId(fetchedUserId);

        // 랭킹 데이터 가져오기
        console.log('Fetching rankings...');
        const rankingsResponse = await axiosInstance.get(`/api/record/leaderboard?createdBy=${fetchedUserId}`);
        console.log('Rankings fetched successfully:', rankingsResponse.data);
        setRankings(rankingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('데이터를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchUserData();
  }, [navigate]);

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
          누가 나를 가장 잘 알고 있을까?<br />
          친구들의 순위를 확인하세요!
        </p>
      </div>

      {/* 랭킹 리스트 */}
      <div className="ranking-list">
        {rankings.map((rank, index) => (
          <div key={index} className={`ranking-item rank-${((index + 1)%5)}`}>
            <div className="ranking-avatar">
              <img src={characterImages[index % characterImages.length]} alt="캐릭터 이미지" />
            </div>
            <div className="ranking-details">
              <div className="ranking-nickname-container">
                <div className="nickname">
                  {rank.score>=10 ? `${nickname}님의 찐친!`:
                  rank.score>=6 ? '조금 더 친해지자!':'우리 처음 본 사이인거지 ?'}                  
                  <br />
                  <div className='tested-by-nickname'>
                    <p>{rank.testedByNickname}</p>
                    <button
                      className={`send-letter-btn ${rank.score >= 6 ? 'show' : ''}`}
                      onClick={() => handleLetterClick(rank.testedByNickname)}
                    >
                    편지 보내기
                  </button>
                </div>
                </div>
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