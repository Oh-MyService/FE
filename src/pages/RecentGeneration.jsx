import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const RecentGeneration = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 모달
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // 삭제 모달 확인
  const confirmDelete = () => {
    closeDeleteModal();
  };

  // 이미지 다운로드
  const handleSaveImage = () => {};

  // 리스트에서 이미지 삭제
  const handleDeleteImage = () => {
    openDeleteModal();
  };

  return (
    <div className="mx-auto px-0 pt-24 max-w-[85%]">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/MyPage")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-['pretendard-extrabold']">
            Recent Generation
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-8">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-center w-60"
          >
            <div className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"></div>
            <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium']">
              <p className="text-left">2024-01-01</p>
              <div className="flex items-center space-x-2">
                <button onClick={handleSaveImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
                <button onClick={handleDeleteImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0 a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default RecentGeneration;
