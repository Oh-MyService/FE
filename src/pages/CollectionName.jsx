import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/NameEditModal";
import CollectionAddModal from "../components/CollectionAddModal";

const CollectionName = () => {
  const { collectionName } = useParams();
  const navigate = useNavigate();

  const [collections, setCollections] = useState([
    {
      images: [require("../assets/slider4.webp")],
      date: "2023-05-30",
      name: "Collection 1",
    },
    {
      images: [require("../assets/slider8.jpg")],
      date: "2023-06-01",
      name: "Collection 2",
    },
    {
      images: [require("../assets/slider6.webp")],
      date: "2023-06-02",
      name: "Collection 3",
    },
    {
      images: [require("../assets/slider3.png")],
      date: "2023-06-03",
      name: "Collection 4",
    },
    {
      images: [require("../assets/slider11.webp")],
      date: "2023-06-04",
      name: "Collection 5",
    },
    {
      images: [require("../assets/slider7.webp")],
      date: "2023-06-04",
      name: "Collection 6",
    },
  ]);
  const [pageTitle, setPageTitle] = useState("Name");

  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // AddModal 상태 추가
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openAddModal = (e) => {
    e.stopPropagation();
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const editCollection = (newName) => {
    const updatedCollections = collections.map((collection, index) =>
      index === editIndex ? { ...collection, name: newName } : collection
    );
    setCollections(updatedCollections);
    closeEditModal();
  };

  const deleteCollection = () => {
    const newCollections = collections.filter((_, i) => i !== deleteIndex);
    setCollections(newCollections);
    closeDeleteModal();
  };

  const updatePageTitle = (newTitle) => {
    setPageTitle(newTitle);
  };

  const handleSaveImage = (e) => {
    e.stopPropagation();
    // 이미지 다운로드 로직을 여기에 추가합니다.
  };

  const handleDeleteImage = (index, e) => {
    e.stopPropagation();
    openDeleteModal(index);
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      <div className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/my-collection")}>
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
            <h1 className="text-3xl font-extrabold">{pageTitle}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative aspect-square w-full font-['pretendard-medium']"
                onClick={() => showFullScreenImage(collection.images[0])}
              >
                <img
                  src={collection.images[0]}
                  alt={`${collection.name} Image`}
                  className="w-full h-full object-cover"
                />
                <div className="flex justify-between items-center w-full mt-2 text-gray-600">
                  <p className="text-gray-600">{collection.date}</p>
                  <div className="flex items-center space-x-2">
                    <button onClick={openAddModal}>
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    </button>
                    <button onClick={(e) => handleDeleteImage(index, e)}>
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0 a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0 a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button onClick={handleSaveImage}>
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
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-center col-span-6">
              저장된 패턴이 없습니다.
            </p>
          )}
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
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onEdit={updatePageTitle}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={deleteCollection}
        />
        {isAddModalOpen && <CollectionAddModal onClose={closeAddModal} />}
      </div>
    </div>
  );
};

export default CollectionName;
