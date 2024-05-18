import React, { useState, useRef } from 'react';
import CustomModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const onChangeImage = (e) => {
        const profileImageFile = e.target.files[0];

        // 만약 파일이 없거나 취소되었을 경우
        if (!profileImageFile) {
            return;
        }

        const profileImageUrl = URL.createObjectURL(profileImageFile);
        setProfileImage(profileImageUrl);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const goToRecentGeneration = () => navigate('/RecentGeneration');
    const goToCollection = () => navigate('/MyCollection');

    return (
        <div className="flex justify-center items-start min-h-screen">
            <div className="flex flex-col my-52 mr-12">
                <input type="file" ref={fileInputRef} onChange={onChangeImage} className="hidden" />
                <div
                    className="overflow-hidden rounded-full w-48 h-48 bg-gray-200 flex justify-center items-center cursor-pointer m-3"
                    onClick={handleImageClick}
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Profile Picture" className="w-full h-full object-cover" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="2 2 20 20"
                            fill="currentColor"
                            className="w-48 h-48"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <div className="text-center font-['pretendard-medium'] m-3">오마이서비스</div>
            </div>

            <div className="flex flex-col text-left my-auto ml-10">
                <div className="flex items-center">
                    <button className="bg-transparent p-2 ml-neg flex items-center" onClick={goToRecentGeneration}>
                        <h2 className="text-2xl font-['pretendard-extrabold'] mb-3">Recent Generation</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-8 h-8 mb-3 ml-2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-12 mb-10">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                </div>
                <div className="flex items-center">
                    <button className="bg-transparent p-2 ml-neg flex items-center" onClick={goToCollection}>
                        <h2 className="text-2xl font-['pretendard-extrabold'] mb-3 mt-10">My Collection</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-8 h-8 mt-7 ml-2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-12">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
