import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/NewCollectionModal";
import DeleteModal from "../components/DeleteModal";

const MyCollection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collections, setCollections] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCollections = async (userId) => {
      try {
        const response = await fetch(
          `http://43.202.57.225:28282/api/collections/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const collectionsData = await Promise.all(
            data.collection_list.map(async (collection) => {
              const imagesResponse = await fetch(
                `http://43.202.57.225:28282/api/collections/${collection.collection_id}/images`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const imagesData = imagesResponse.ok
                ? await imagesResponse.json()
                : { images: [] };

              return {
                id: collection.collection_id,
                name: collection.collection_name,
                images: imagesData.images,
              };
            })
          );

          setCollections(collectionsData);
        } else {
          console.error("Failed to fetch collections:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections(userId);
  }, [userId, token]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openDeleteModal = (id) => {
    setSelectedCollectionId(id);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://43.202.57.225:28282/api/collections/${selectedCollectionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedCollections = collections.filter(
          (collection) => collection.id !== selectedCollectionId
        );
        setCollections(updatedCollections);
        closeDeleteModal();
      } else {
        console.error("Failed to delete collection:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleCreateCollection = async (collectionName) => {
    const newCollection = {
      name: collectionName,
      images: Array(4).fill({ image_data: "" }), // Placeholder base64 data
    };

    try {
      const response = await fetch(
        "http://43.202.57.225:28282/api/collections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({
            collection_name: collectionName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Collection created:", data);
        setCollections([newCollection, ...collections]);
        closeModal();
      } else {
        console.error("Failed to create collection:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleCollectionClick = (collectionId) => {
    navigate(`/collection/${collectionId}`);
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
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-col items-center cursor-pointer relative"
              onClick={() => handleCollectionClick(collection.id)}
            >
              <div className="grid grid-cols-2 gap-1 aspect-square">
                {collection.images
                  .concat(
                    Array(4 - collection.images.length).fill({ image_data: "" })
                  )
                  .slice(0, 4)
                  .map((image, idx) => (
                    <div key={idx} className="w-full h-full">
                      {image.image_data ? (
                        <img
                          src={"data:image/jpeg;base64," + image.image_data}
                          alt={`${collection.name} Image ${idx}`}
                          className="w-full h-full object-cover"
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/150")
                          }
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="flex justify-between items-center w-full mt-2 text-gray-600 font-['pretendard-medium']">
                <p>{collection.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when the delete button is clicked
                    openDeleteModal(collection.id);
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
