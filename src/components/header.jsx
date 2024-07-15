import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate('/my-page');
    };

    const goToMain = () => {
        navigate('/');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <header className="bg-neutral-800 py-3 fixed top-0 w-full z-10 h-16 font-[pretendard-medium]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center mt-2">
                    <img src={logo} alt="Logo" className="h-5 cursor-pointer" onClick={goToMain} />
                </div>
                <div className="flex-1 flex justify-end mt-2">
                    <button
                        onClick={goToMyPage}
                        aria-label="My Page"
                        className="text-white cursor-pointer hover:underline"
                        style={{ transform: 'translateY(2px)' }}
                    >
                        마이페이지
                    </button>
                    <div className="text-white ml-3 pt-1">|</div>
                    <button
                        onClick={goToLogin}
                        className="text-white ml-4 hover:underline"
                        style={{ transform: 'translateY(2px)' }}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
