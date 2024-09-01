import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/login_bg.png';
import { ReactComponent as DLlogo } from '../assets/designovel_icon_black.svg';
import SignupForm from './SignupForm';

const LoginForm = ({ setToken }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const navigate = useNavigate();

    // 로그인
    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);
            setLoginErrorMessage('');

            const username = e.target.loginUsername.value;
            const password = e.target.loginPassword.value;

            try {
                const response = await fetch('http://118.67.128.129:28282/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('user_id', data.user_id);
                    setToken(data.access_token);
                    setResult('Login successful: ' + JSON.stringify(data, null, 2));
                    navigate('/'); // 로그인 성공 시 메인 페이지로 이동
                } // 401 에러일 경우 메시지 설정
                else if (response.status === 401) {
                    setLoginErrorMessage('아이디 혹은 비밀번호가 맞지 않습니다.');
                } else {
                    setResult('Login failed: ' + JSON.stringify(data, null, 2));
                }
            } catch (error) {
                setResult('Login error: ' + error.message);
            }
            setLoading(false);
        },
        [navigate, setToken]
    );

    const handleRegisterSuccess = useCallback(() => {
        setIsRegister(false);
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-[780px] h-[550px] flex items-center justify-center rounded-xl shadow-xl overflow-hidden">
                <div
                    className={`w-[50%] h-full flex flex-col items-center justify-center transition-all duration-200 ${
                        isRegister ? 'bg-white' : 'bg-[#3A57A7]'
                    }`}
                >
                    {isRegister ? (
                        <SignupForm
                            onRegisterSuccess={handleRegisterSuccess}
                            onSwitchToLogin={() => setIsRegister(false)}
                        />
                    ) : (
                        <>
                            <h2 className="text-2xl font-['pretendard-bold'] text-white">환영합니다!</h2>
                            <p className="text-xl font-['pretendard-medium'] text-white pt-5 pb-5">
                                로그인해서 패턴을 자유롭게 생성하세요!
                            </p>
                            <button
                                onClick={() => setIsRegister(true)}
                                className="mt-4 border-2 text-white font-['pretendard-medium'] py-2 px-12 rounded-lg"
                            >
                                회원가입
                            </button>
                        </>
                    )}
                </div>
                <div
                    className={`w-[50%] h-full flex flex-col items-center justify-center transition-all duration-200 ${
                        isRegister ? 'bg-[#3A57A7] relative' : 'bg-white'
                    }`}
                >
                    {!isRegister && <DLlogo width="100" height="100" />}
                    <>
                        {!isRegister ? (
                            <>
                                <h2 className="text-2xl font-['pretendard-bold'] text-center mb-8 text-black">
                                    로그인
                                </h2>
                                <form
                                    onSubmit={handleLogin}
                                    className="flex flex-col items-center justify-center gap-4"
                                >
                                    <div>
                                        <input
                                            type="text"
                                            htmlFor="loginUsername"
                                            id="loginUsername"
                                            name="loginUsername"
                                            required
                                            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                                            placeholder="Id"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            htmlFor="loginPassword"
                                            id="loginPassword"
                                            name="loginPassword"
                                            required
                                            className="mt-1 block w-full bg-gray-200 rounded-md shadow-sm p-2 focus:outline-[#3A57A7] font-['pretendard-medium']"
                                            placeholder="Password"
                                        />
                                        {loginErrorMessage && (
                                            <p className="text-red-500 font-['pretendard-medium'] text-sm mt-1">
                                                {loginErrorMessage}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 bg-[#3A57A7] hover:bg-[#2c4383] text-white py-2 px-12 rounded-full font-['pretendard-medium']"
                                    >
                                        로그인
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div></div>
                        )}
                        {isRegister && (
                            <>
                                <h2 className="text-2xl font-['pretendard-bold'] text-white">
                                    아직 계정이 없으신가요?
                                </h2>
                                <p className="text-xl font-['pretendard-medium'] text-white pt-5 pb-5">
                                    가입 후 나만의 <br></br> 패턴 아카이브를 만들어보세요!
                                </p>
                                <button
                                    onClick={() => setIsRegister(false)}
                                    className="mt-4 border-2 text-white py-2 px-12 rounded-lg font-['pretendard-medium']"
                                >
                                    로그인
                                </button>
                            </>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
