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
            <span className="text-gray-500">image</span>
          )}
        </div>
        <div className="text-center m-3">ohmyservice@gmail.com</div>
      </div>

      <div className="flex flex-col text-left ml-10">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold m-3">Recent Generation</h2>
          <button
            className="bg-transparent p-2 ml-neg" // ml-neg 는 왼쪽으로 이동시키는 커스텀 클래스
            onClick={goToRecentGeneration}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-12">
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
        </div>
        <h2 className="text-2xl font-bold m-3">Collection</h2>
        <div className="grid grid-cols-4 gap-12">
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div
            className="flex items-center justify-center w-60 h-60 bg-gray-200 cursor-pointer hover:bg-gray-300"
            onClick={openModal}
          >
            <button className="text-4xl text-gray-600 hover:text-black">
              +
            </button>
          </div>
        </div>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default Mypage;
