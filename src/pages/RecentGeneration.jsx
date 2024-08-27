import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import CollectionAddModal from "../components/CollectionAddModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecentGeneration = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  // 모달 및 기타 상태 관리
  const [items, setItems] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addCollectionId, setAddCollectionId] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  // 최근 생성 이미지 불러오기
  useEffect(() => {
    const fetchAllImages = async (userId) => {
      try {
        const response = await fetch(
          `http://43.202.57.225:28282/api/results/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          let results = await response.json();
          // 그룹화 및 정렬 적용
          const groupedItemsById = groupItemsById(results);
          const sortedGroups = groupedItemsById.sort((a, b) => {
            return b[0].id - a[0].id;
          });
          const sortedItems = sortedGroups.flat();
          setItems(sortedItems);
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAllImages(userId);
    } else {
      console.error("No userId found in localStorage");
      setIsLoading(false);
    }
  }, [userId, token]);

  // id로 그룹화
  const groupItemsById = (items) => {
    const groups = [];
    let currentGroup = [];

    for (let i = 0; i < items.length; i++) {
      currentGroup.push(items[i]);
      // 다음 아이템이 현재 아이템의 다음 id가 아닐 경우 그룹을 나눔
      if (i < items.length - 1 && items[i + 1].id !== items[i].id + 1) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }
    // 마지막 그룹 추가
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    return groups;
  };

  // 이미지 클릭 시 전체 화면
  const showFullScreenImage = (imageUrl, imageId) => {
    console.log("Image ID:", imageId); // 이미지 ID 콘솔 출력
    setFullScreenImage(imageUrl);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  // 이미지 삭제
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://43.202.57.225:28282/api/results/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setDeleteId(null);
        closeDeleteModal();
      } else {
        console.error("Failed to delete images");
      }
    } catch (error) {
      console.error("Error delete items:", error);
    }
  };

  // 이미지 컬렉션에 추가
  const openAddModal = (id) => {
    setAddCollectionId(id);
    setAddModalOpen(true);
  };

  const closeAddModal = () => setAddModalOpen(false);

  // 로컬에 이미지 저장하기
  const handleSaveImage = (imageData, imageId) => {
    const byteCharacters = atob(imageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `image_${imageId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // 최신순 정렬을 위한 그룹화
  const groupItemsByDate = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      const date = item.created_at.split("T")[0];
      if (!groupedItems[date]) {
        groupedItems[date] = [];
      }
      groupedItems[date].push(item);
    });
    return groupedItems;
  };

  const groupedItems = groupItemsByDate(items);
  const sortedDates = Object.keys(groupedItems).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="bg-[#F2F2F2] min-h-screen pb-5">
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
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center font-['pretendard-extrabold'] text-5xl mb-4 text-black leading-snug">
              생성된 패턴이 없습니다. <br />
              지금 만들러 가보세요!
            </p>
            <button
              onClick={() => navigate("/create-image")}
              className="px-6 py-2 border bg-[#3A57A7] hover:bg-[#213261] text-white rounded-full font-['pretendard-medium'] text-xl mt-2"
            >
              패턴 생성하기
            </button>
          </div>
        ) : (
          sortedDates.map((date, dateIndex) => (
            <div
              key={dateIndex}
              className="flex flex-col justify-center mt-2 w-full bg-white p-5 rounded-lg shadow-md my-4"
            >
              <div className="flex items-start justify-start mb-4">
                <div className="rounded-full border-2 border-[#303030] px-4 py-1 text-base text-black font-['pretendard-semibold']">
                  {date}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-2">
                {groupedItems[date].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer relative aspect-square w-full"
                  >
                    <LazyLoadImage
                      src={"data:image/jpeg;base64," + item.image_data}
                      alt={"Image ID: " + item.id}
                      className="w-full h-full object-cover"
                      effect="blur"
                      onClick={() =>
                        showFullScreenImage(
                          "data:image/jpeg;base64," + item.image_data,
                          item.id
                        )
                      }
                    />
                    <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
                      <p className="text-left">{date}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddModal(item.id);
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
                            openDeleteModal(item.id);
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
                            handleSaveImage(item.image_data, item.id);
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
                ))}
              </div>
            </div>
          ))
        )}
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
        {isAddModalOpen && (
          <CollectionAddModal
            onClose={closeAddModal}
            resultId={addCollectionId}
          />
        )}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={() => handleDelete(deleteId)}
        />
      </div>
    </div>
  );
};

export default RecentGeneration;
