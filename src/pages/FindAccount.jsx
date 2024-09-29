import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/login_bg.png';
import { ReactComponent as DLlogo } from '../assets/designovel_icon_black.svg';

const FindAccount = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFindAccount = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setMessage('');

        try {
            const response = await fetch('http://example.com/api/find-account', {
                // 실제 API 경로로 변경 필요
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
                setTimeout(() => {
                    navigate('/login'); // 링크가 전송된 후 로그인 페이지로 이동
                }, 3000);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || '이메일 전송에 실패했습니다.');
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다.');
        }
        setLoading(false);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-[780px] h-[550px] flex items-center justify-center rounded-xl shadow-xl overflow-hidden">
                <div className="w-[50%] h-full bg-[#3A57A7] flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-['pretendard-bold'] text-white">비밀번호를 잊으셨나요?</h2>
                    <p className="text-xl font-['pretendard-medium'] text-white pt-5 pb-5">
                        이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
                    </p>
                    <DLlogo width="100" height="100" />
                </div>
                <div className="w-[50%] h-full bg-white flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-['pretendard-bold'] text-center mb-8 text-black">비밀번호 찾기</h2>
                    <form onSubmit={handleFindAccount} className="flex flex-col items-center justify-center gap-4">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                            placeholder="이메일 주소"
                        />
                        {errorMessage && (
                            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">{errorMessage}</p>
                        )}
                        {message && <p className="text-green-500 font-['pretendard-medium'] text-sm mt-1">{message}</p>}
                        <button
                            type="submit"
                            className="mt-4 bg-[#3A57A7] hover:bg-[#2c4383] text-white py-2 px-12 rounded-full font-['pretendard-medium']"
                            disabled={loading}
                        >
                            {loading ? '전송 중...' : '비밀번호 찾기'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindAccount;
