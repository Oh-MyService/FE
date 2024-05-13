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
        const profileImageUrl = URL.createObjectURL(profileImageFile);
        setProfileImage(profileImageUrl);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const goToRecentGeneration = () => navigate('/RecentGeneration');
    const goToCollection = () => navigate('/Collection');

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col mx-0 my-auto mr-10">
                <input type="file" ref={fileInputRef} onChange={onChangeImage} className="hidden" />
                <div
                    className="overflow-hidden rounded-full w-48 h-48 bg-gray-200 flex justify-center items-center cursor-pointer m-3"
                    onClick={handleImageClick}
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Profile Picture" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500">image</span>
                    )}
                </div>
                <div className="text-center m-3">오마이</div>
            </div>

            <div className="flex flex-col text-left ml-10">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold m-3">Recent Generation</h2>
                    <button className="bg-transparent p-2 ml-neg" onClick={goToRecentGeneration}>
                        {/* SVG icon for navigation */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-12">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                </div>
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold m-3">Collection</h2>
                    <button className="bg-transparent p-2" onClick={goToCollection}>
                        {/* Possibly the same SVG icon for consistency */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-12">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                </div>
            </div>
            <CustomModal isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    );
};

export default Mypage;
