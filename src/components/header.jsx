import React from 'react';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate('/mypage');
    };

    const goToCreateImage = () => {
        navigate('/CreateImage');
    };

    return (
        <header className="bg-neutral-800 py-3 fixed top-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-5 cursor-pointer" // 스타일 변경
                        onClick={goToCreateImage}
                    />
                </div>
                <div className="flex-1 flex justify-end">
                    <button onClick={goToMyPage} aria-label="My Page" className="text-white cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-8 w-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 15c1.76 0 3.404.337 4.879.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
