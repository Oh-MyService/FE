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
  const [isLoading, setIsLoading] = useState(true);

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
                images: imagesData.images.reverse(),
                createdAt: collection.created_at,
              };
            })
          );

          collectionsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setCollections(collectionsData);
        } else {
          console.error("Failed to fetch collections:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections(userId);
  }, [userId, token]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // id 사용
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
      images: Array(4).fill({ image_data: "" }),
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

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`, { state: { collection } });
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
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-20 h-20 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center font-['pretendard-extrabold'] text-5xl mb-4 text-black leading-snug">
              생성된 아카이브가 없습니다. <br />
              지금 아카이브 해보세요!
            </p>
            <button
              onClick={openModal}
              className="px-6 py-2 border bg-[#3A57A7] hover:bg-[#213261] text-white rounded-full font-['pretendard-medium'] text-xl mt-2"
            >
              아카이브 생성하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => handleCollectionClick(collection)}
              >
                <div className="grid grid-cols-2 gap-1 w-full">
                  {collection.images
                    .concat(
                      Array(Math.max(0, 4 - collection.images.length)).fill({
                        image_data: "",
                      })
                    )
                    .slice(0, 4)
                    .map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-full"
                        style={{ aspectRatio: "1/1" }}
                      >
                        {image.image_data ? (
                          <img
                            src={"data:image/jpeg;base64," + image.image_data}
                            alt={`${collection.name} Image ${idx}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/150")
                            }
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between items-center w-full mt-2 text-gray-600 font-['pretendard-medium']">
                  <p>{collection.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
        )}
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
