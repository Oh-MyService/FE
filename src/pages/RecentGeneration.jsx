import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import AddModal from "../components/AddModal";

const RecentGeneration = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([...Array(7).keys()]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // 삭제 모달
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // 삭제 모달 확인
  const confirmDelete = () => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== deleteIndex));
    closeDeleteModal();
  };

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  // 이미지 다운로드
  const handleSaveImage = () => {};

  // 리스트에서 이미지 삭제
  const handleDeleteImage = () => {
    openDeleteModal();
  };

  return (
    <div className="bg-[#CCCCCC]">
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
        <div className="grid grid-cols-6 gap-8 mt-8">
          {items.map((item, index) => (
            <div
              key={item}
              className="flex flex-col justify-between items-center w-60"
            >
              <div className="relative overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer">
                <button
                  className="absolute top-0 right-0 mr-2 mt-2 text-white"
                  onClick={() => openDeleteModal(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
                <p className="text-left">2024-01-01</p>
                <div className="flex items-center space-x-2">
                  <button onClick={openAddModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </button>
                  <button onClick={handleSaveImage}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isAddModalOpen && <AddModal onClose={closeAddModal} />}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default RecentGeneration;
