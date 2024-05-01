import React, { useState, useRef } from "react";

const Mypage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // 프로필 사진 업로드
  const onChangeImage = (e) => {
    const profileImageFile = e.target.files[0];
    const profileImageUrl = URL.createObjectURL(profileImageFile);
    setProfileImage(profileImageUrl);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div class="flex justify-center items-center">
      <div class="flex flex-col mx-0 my-auto">
        {/* 프로필 이미지 */}
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
              alt="프로필 사진"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">프로필</span>
          )}
        </div>
        {/* 사용자 이메일 */}
        <div class="text-center m-3">이메일</div>
        {/* 계정 관리 버튼 */}
        <button class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full m-3">
          계정 관리
        </button>
      </div>

      <div class="flex flex-col text-left">
        <h2 class="text-2xl font-bold m-3 ml-0">최근 생성된 유닛</h2>
        <div class="grid grid-cols-4 gap-12">
          <div class="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div class="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div class="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
          <div class="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
        </div>
        <h2 class="text-2xl font-bold m-3 ml-0">컬렉션</h2>
        <div class="grid grid-cols-4 gap-12">
          <div class="z-10 overflow-hidden w-60 h-60 bg-slate-400"></div>
          <div class="z-0 overflow-hidden w-60 h-60 bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
