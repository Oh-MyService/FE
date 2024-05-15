import React, { useState, useRef } from "react";
import CustomModal from "../components/Modal";
import { useNavigate } from "react-router-dom";

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
  const goToRecentGeneration = () => navigate("/RecentGeneration");
  const goToCollection = () => navigate("/MyCollection");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col mx-0 my-auto mr-10">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onChangeImage}
          className="hidden"
        />
        <div
          className="overflow-hidden rounded-full w-48 h-48 bg-gray-200 flex justify-center items-center cursor-pointer m-3"
          onClick={handleImageClick}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
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
        <div className="text-center font-['pretendard-medium'] m-3">
          오마이서비스
        </div>
      </div>

      <div className="flex flex-col text-left ml-10">
        <div className="flex items-center">
          <button
            className="bg-transparent p-2 ml-neg"
            onClick={goToRecentGeneration}
          >
            <h2 className="text-2xl font-['pretendard-extrabold'] m-3">
              Recent Generation >
            </h2>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-12">
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
        </div>
        <div className="flex items-center">
          <button className="bg-transparent p-2" onClick={goToCollection}>
            <h2 className="text-2xl font-['pretendard-extrabold'] m-3">
              Collection >
            </h2>
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
