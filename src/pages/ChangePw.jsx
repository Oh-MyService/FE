import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import background from '../assets/login_bg.png';
import { ReactComponent as DLlogo } from '../assets/designovel_icon_black.svg';

const ChangePW = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');

    // URL에서 토큰 추출
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resetToken = queryParams.get('token');
        if (resetToken) {
            setToken(resetToken);
        } else {
            setErrorMessage('토큰이 유효하지 않습니다.');
        }
    }, [location]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://118.67.128.129:28282/api/change-password', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ 
                    token: token, // 토큰 전달
                    new_password: newPassword, // 새로운 비밀번호 전달}),
                }),
            });

            if (response.ok) {
                setMessage('비밀번호가 성공적으로 변경되었습니다.');

                // 3초 후 로그인 페이지로 이동
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || '비밀번호 변경에 실패했습니다.');
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
                <div className="w-[100%] h-full bg-white flex flex-col items-center justify-center">
                    <DLlogo width="100" height="100" />
                    <h2 className="text-2xl font-['pretendard-bold'] text-black">비밀번호 재설정</h2>

                    <form
                        onSubmit={handleChangePassword}
                        className="flex flex-col items-center justify-center gap-4 mt-6"
                    >
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                            placeholder="새 비밀번호"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                            placeholder="비밀번호 확인"
                        />
                        {newPassword !== confirmPassword && confirmPassword && (
                            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">
                                비밀번호가 일치하지 않습니다.
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">{errorMessage}</p>
                        )}
                        {message && <p className="text-green-500 font-['pretendard-medium'] text-sm mt-1">{message}</p>}
                        <button
                            type="submit"
                            className="mt-4 bg-[#3A57A7] hover:bg-[#2c4383] text-white py-2 px-12 rounded-full font-['pretendard-medium']"
                            disabled={loading}
                        >
                            {loading ? '변경 중...' : '변경'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePW;
