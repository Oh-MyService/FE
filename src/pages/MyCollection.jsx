import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/NewCollectionModal";
import DeleteModal from "../components/DeleteModal";

const MyCollection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [collections, setCollections] = useState([
    {
      name: "Collection 1",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 2",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 3",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 4",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
    {
      name: "Collection 5",
      images: [
        require("../assets/slider4.webp"),
        require("../assets/slider8.jpg"),
        require("../assets/slider6.webp"),
        require("../assets/slider3.png"),
      ],
    },
  ]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openDeleteModal = (index) => {
    setSelectedImageIndex(index);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const confirmDelete = () => {
    const updatedCollections = collections.filter(
      (_, index) => index !== selectedImageIndex
    );
    setCollections(updatedCollections);
    closeDeleteModal();
  };

  const handleCreateCollection = (collectionName) => {
    const newCollection = {
      name: collectionName,
      images: Array(4).fill(require(`../assets/slider8.jpg`)), // Placeholder paths
    };
    setCollections([newCollection, ...collections]);
    closeModal();
  };

  const handleCollectionClick = (collectionName) => {
    navigate(`/collection/${collectionName}`);
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      <div className="mx-auto px-0 pt-24 max-w-[85%]">
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
            <h1 className="text-3xl font-['pretendard-extrabold']">아카이브</h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
            onClick={openModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer relative"
              onClick={() => handleCollectionClick(collection.name)}
            >
              <div className="grid grid-cols-2 gap-1 aspect-square">
                {collection.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${collection.name} Image ${idx}`}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                ))}
              </div>
              <div className="flex justify-between items-center w-full mt-2 text-gray-600 font-['pretendard-medium']">
                <p>{collection.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when the delete button is clicked
                    openDeleteModal(index);
                  }}
                  className="p-1 text-gray-600"
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
              </div>
            </div>
          ))}
        </div>
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreate={handleCreateCollection}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default MyCollection;
