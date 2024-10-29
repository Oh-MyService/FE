import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArchiveDeleteModal from '../components/ArchiveDeleteModal';
import EditModal from '../components/NameEditModal';
import CollectionAddModal from '../components/CollectionAddModal';

const CollectionName = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  // 컬렉션 상태 관리
  const [collectionName, setCollectionName] = useState('');
  const [images, setImages] = useState([]);

  // 모달 및 기타 상태 관리
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isArchiveDeleteModalOpen, setArchiveDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [addCollectionId, setAddCollectionId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [fullScreenImageId, setFullScreenImageId] = useState(null);

  // 프롬프트 데이터 상태 관리
  const [promptData, setPromptData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // 이미지 전체 화면
  const showFullScreenImage = (imageUrl, imageId) => {
    setFullScreenImage(imageUrl);
    setFullScreenImageId(imageId);
    setShowPopup(false);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
    setFullScreenImageId(null);
  };

  // 팝업을 닫는 함수
  const closePopup = (e) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  // 삭제 모달
  const openArchiveDeleteModal = (id) => {
    setDeleteId(id);
    setArchiveDeleteModalOpen(true);
  };

  const closeArchiveDeleteModal = () => {
    setArchiveDeleteModalOpen(false);
  };

  // 편집 모달
  const openEditModal = (index) => {
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // 추가 모달
  const openAddModal = (id) => {
    setAddCollectionId(id);
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // 컬렉션 및 이미지 불러오기
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        // 1. 유저의 모든 컬렉션 불러오기
        const collectionsResponse = await fetch(
          `http://118.67.128.129:28282/api/collections/user/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (collectionsResponse.ok) {
          const collectionsData = await collectionsResponse.json();
          const selectedCollection = collectionsData.collection_list.find(
            (collection) => collection.collection_id.toString() === collectionId
          );

          if (selectedCollection) {
            setCollectionName(selectedCollection.collection_name); // 해당 컬렉션의 이름 설정
          } else {
            console.error('Collection not found');
          }

          // 2. 이미지 정보 불러오기
          const imagesResponse = await fetch(
            `http://118.67.128.129:28282/api/collections/${collectionId}/images`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            setImages(imagesData.images.reverse()); // 최신순으로 정렬
          } else {
            console.error('Failed to fetch images');
          }
        } else {
          console.error('Failed to fetch collections');
        }
      } catch (error) {
        console.error('Error fetching collection details:', error);
      }
    };

    fetchCollectionDetails();
  }, [collectionId, userId, token]);

  // 컬렉션 이름 수정
  const editCollection = async (newName) => {
    try {
      const response = await fetch(
        `http://118.67.128.129:28282/api/collections/${collectionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({ new_name: newName }),
        }
      );
      if (response.ok) {
        setCollectionName(newName);
        closeEditModal();
      } else {
        console.error('Failed to update collection name');
      }
    } catch (error) {
      console.error(
        'An error occurred while updating the collection name:',
        error
      );
    }
  };

  // 이미지 삭제
  const deleteCollection = async () => {
    try {
      const response = await fetch(
        `http://118.67.128.129:28282/api/collections/${collectionId}/results/${deleteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== deleteId)
        );
        closeArchiveDeleteModal();
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('An error occurred while deleting the image:', error);
    }
  };

  // 로컬에 이미지 저장하기
  const handleSaveImage = (imageUrl, imageId) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `image_${imageId}.webp`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error('Error downloading the image:', error);
      });
  };

  // 이미지 삭제 모달 열기
  const handleDeleteImage = (id, e) => {
    e.stopPropagation();
    openArchiveDeleteModal(id);
  };

  // 프롬프트 정보를 불러오는 함수
  const handleIconClick = async () => {
    try {
      const response = await fetch(
        `http://118.67.128.129:28282/api/results/${fullScreenImageId}/prompt`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPromptData(data);
        setShowPopup(true);
      } else {
        console.error('Failed to fetch prompt data');
      }
    } catch (error) {
      console.error('Error fetching prompt data:', error);
    }
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen">
      <div className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/my-collection')}>
              {/* 뒤로가기 버튼 */}
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
              {collectionName}
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(0); // 컬렉션 이름 편집 모달 열기
              }}
              className="focus:outline-none"
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
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative aspect-square w-full font-['pretendard-medium']"
              >
                <img
                  src={image.image_data}
                  alt={'Image ID: ' + image.id}
                  className="w-full h-full object-cover"
                  onClick={() =>
                    showFullScreenImage(image.image_data, image.id)
                  } // 이미지 클릭 시 전체 화면으로 보기
                />
                <div className="flex justify-between items-center w-full mt-2 text-gray-600">
                  <p className="text-gray-600">
                    {image.created_at.split('T')[0]}{' '}
                    {/* 이미지 생성 날짜 표시 */}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddModal(image.id); // 이미지 추가 모달 열기
                      }}
                      className="focus:outline-none"
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDeleteImage(image.id, e)} // 이미지 삭제 모달 열기
                      className="focus:outline-none"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0 a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0 a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={
                        (e) => handleSaveImage(image.image_data, image.id) // 이미지 저장 기능 호출
                      }
                      className="focus:outline-none"
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
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* 이미지가 없을 때의 메시지 및 버튼 */}
            <p className="text-center font-['pretendard-extrabold'] text-5xl mb-4 text-black leading-snug">
              저장된 패턴이 없습니다.
            </p>
            <button
              onClick={() => navigate('/recent-generation')}
              className="px-6 py-2 border bg-[#3A57A7] hover:bg-[#213261] text-white rounded-full font-['pretendard-medium'] text-xl mt-2"
            >
              패턴 추가하기
            </button>
          </div>
        )}
        {fullScreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center p-4 z-[1000]"
            onClick={closeFullScreen}
          >
            <div
              className="grid grid-cols-3 gap-0"
              style={{ width: 'min(80vw, 80vh)', height: 'min(80vw, 80vh)' }}
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <img
                  key={index}
                  src={fullScreenImage}
                  alt="Full Screen Grid"
                  className="w-full h-full object-contain"
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick();
              }}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
            {showPopup && promptData && (
              <div className="absolute top-16 right-16 bg-white shadow-lg rounded-lg p-4 w-auto max-w-xl max-h-[80vh] overflow-auto z-50">
                <h3 className="text-lg font-['pretendard-bold'] mb-2 text-left">
                  Prompt
                </h3>
                <hr className="my-2 border-gray-300" />
                <p className="mb-4 text-base text-gray-700 font-['pretendard-medium'] whitespace-pre-wrap  break-words">
                  {promptData.content.positive_prompt}
                </p>
                <h3 className="text-lg font-['pretendard-bold'] mb-2 text-left">
                  Option
                </h3>
                <hr className="my-2 border-gray-300" />
                <table className="w-full text-left border-separate border-spacing-0">
                  <tbody>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        width
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.width}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        height
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.height}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        background color
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.background_color}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        mood
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.mood}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        cfg scale
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.cfg_scale}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        sampling steps
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.sampling_steps}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-base font-['pretendard-semibold'] pr-2">
                        seed
                      </td>
                      <td className="py-1 text-sm font-['pretendard-medium']">
                        {promptData.ai_option.seed}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={closePopup}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
        {/* 모달 컴포넌트 렌더링 */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onEdit={editCollection}
        />
        <ArchiveDeleteModal
          isOpen={isArchiveDeleteModalOpen}
          onRequestClose={closeArchiveDeleteModal}
          onDelete={deleteCollection}
        />
        {isAddModalOpen && (
          <CollectionAddModal
            onClose={closeAddModal}
            resultId={addCollectionId}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionName;
