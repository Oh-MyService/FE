import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import CollectionAddModal from "../components/CollectionAddModal";

const RecentGeneration = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const userId = 3;

  useEffect(() => {
    const fetchAllImages = async (userId) => {
      try {
        let response = await fetch(`/user_results?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          let results = await response.json();
          setItems(results);
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchAllImages(userId);
  }, [userId]);

  const showFullScreenImage = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const confirmDelete = () => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== deleteIndex));
    setDeleteIndex(null); // Reset the deleteIndex after deletion
    closeDeleteModal();
  };

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const handleSaveImage = () => {};

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      <div className="mx-auto px-4 pt-24 max-w-[85%]">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/my-page")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3.5"
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
              최근 생성 패턴
            </h1>
          </div>
        </div>
        <div
          id="imageDisplayArea"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8"
        >
          {items.map((item, index) => {
            const formattedDate = item.created_at.split("T")[0]; // 날짜 부분만 추출
            return (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative aspect-square w-full"
                onClick={() =>
                  showFullScreenImage(
                    "data:image/jpeg;base64," + item.image_data
                  )
                }
              >
                <img
                  src={"data:image/jpeg;base64," + item.image_data}
                  alt={"Image ID: " + item.id}
                  className="w-full h-full object-cover"
                />
                <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
                  <p className="text-left">{formattedDate}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddModal();
                      }}
                    >
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(index);
                      }}
                    >
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveImage();
                      }}
                    >
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
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {fullScreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center p-4"
            onClick={closeFullScreen}
          >
            <img
              src={fullScreenImage}
              alt="Full Screen"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {isAddModalOpen && <CollectionAddModal onClose={closeAddModal} />}
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
