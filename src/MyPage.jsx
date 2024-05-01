import React, { useState, useRef } from 'react';
import CustomModal from './Modal'; // 모달 컴포넌트를 임포트합니다.

const Mypage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 추가
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

    const openModal = () => setModalIsOpen(true); // 모달을 열기 위한 함수
    const closeModal = () => setModalIsOpen(false); // 모달을 닫기 위한 함수

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col mx-0 my-auto">
                {/* 프로필 이미지 */}
                <input type="file" ref={fileInputRef} onChange={onChangeImage} className="hidden" />
                <div
                    className="overflow-hidden rounded-full w-48 h-48 bg-gray-200 flex justify-center items-center cursor-pointer m-3"
                    onClick={handleImageClick}
                >
                    {profileImage ? (
                        <img src={profileImage} alt="프로필 사진" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500">프로필</span>
                    )}
                </div>
                {/* 사용자 이메일 */}
                <div className="text-center m-3">이메일</div>
                {/* 계정 관리 버튼 */}
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full m-3">
                    계정 관리
                </button>
            </div>

            <div className="flex flex-col mx-0 my-auto">
                <div>최근 생성된 유닛</div>
                <div className="grid grid-cols-4 gap-12">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
                </div>
                <div>컬렉션</div>
                <div className="grid grid-cols-4 gap-12">
                    <div className="overflow-hidden w-60 h-60 bg-slate-400"></div>
                    <div className="overflow-hidden w-60 h-60 bg-slate-400"></div>
                    {/* + 버튼 추가 */}
                    <div
                        className="flex items-center justify-center w-60 h-60 bg-gray-200 cursor-pointer hover:bg-gray-300"
                        onClick={openModal}
                    >
                        <button className="text-4xl text-gray-600 hover:text-black">+</button>
                    </div>
                </div>
            </div>
            {/* 모달 컴포넌트 사용 */}
            <CustomModal isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    );
};

export default Mypage;
