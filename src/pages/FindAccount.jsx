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
            const response = await fetch('http://118.67.128.129:28282/api/find-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('임시 비밀번호가 이메일로 전송되었습니다.');
                setTimeout(() => {
                    navigate('/login');
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
            <div className="w-[780px] h-[550px] flex items-center justify-center rounded-xl shadow-xl overflow-hidden relative">
                {/* 뒤로가기 아이콘 버튼 */}
                <button onClick={() => navigate('/login')} className="absolute top-4 left-4 p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <div className="w-[100%] h-full bg-white flex flex-col items-center justify-center">
                    <DLlogo width="100" height="100" />
                    <h2 className="text-2xl font-['pretendard-bold'] text-black">비밀번호를 잊으셨나요?</h2>
                    <p
                        className="text-xl font-['pretendard-medium'] text-black pt-5 pb-5"
                        style={{ lineHeight: '1.5' }}
                    >
                        가입 시 사용했던 이메일을 입력하시면 <br /> 비밀번호 재설정 링크를 보내드립니다.
                    </p>

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
                            {loading ? '전송 중...' : '전송'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindAccount;
