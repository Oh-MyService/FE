import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/NameEditModal';
import CollectionAddModal from '../components/CollectionAddModal';

const CollectionName = () => {
    const { collectionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // 컬렉션 및 이미지 상태 관리
    const [collection, setCollection] = useState(location.state?.collection || null); // 방어 코드 추가
    const [images, setImages] = useState(collection?.images || []); // collection이 null일 경우 빈 배열로 설정

    // 모달 및 기타 상태 관리
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [addCollectionId, setAddCollectionId] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // 만약 collection이 없으면 데이터 로딩 또는 에러 처리 로직 추가
    useEffect(() => {
        if (!collection) {
            const fetchCollection = async () => {
                try {
                    const response = await fetch(`http://118.67.128.129:28282/api/collections/${collectionId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCollection(data); // 컬렉션 데이터 설정
                        setImages(data.images || []); // 이미지 데이터 설정
                    } else {
                        console.error('Failed to fetch collection data');
                    }
                } catch (error) {
                    console.error('An error occurred while fetching collection data:', error);
                }
            };
            fetchCollection();
        }
    }, [collection, collectionId, token]);

    // 이미지 전체 화면
    const showFullScreenImage = (imageUrl) => {
        setFullScreenImage(imageUrl);
    };

    const closeFullScreen = () => {
        setFullScreenImage(null);
    };

    // 삭제 모달
    const openDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
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

    // 컬렉션 이름 수정
    const editCollection = async (newName) => {
        try {
            const response = await fetch(`http://118.67.128.129:28282/api/collections/${collectionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams({ new_name: newName }),
            });
            if (response.ok) {
                setCollection((prevCollection) => ({
                    ...prevCollection,
                    name: newName,
                }));
                closeEditModal();
            } else {
                console.error('Failed to update collection name');
            }
        } catch (error) {
            console.error('An error occurred while updating the collection name:', error);
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
                setImages((prevImages) => prevImages.filter((image) => image.id !== deleteId));
                closeDeleteModal();
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
                link.download = `image_${imageId}.jpg`;
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
        openDeleteModal(id);
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* collection이 있을 때만 렌더링 */}
                        {collection && <h1 className="text-3xl font-['pretendard-extrabold']">{collection.name}</h1>}
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
                                    alt={`${collection.name} Image`}
                                    className="w-full h-full object-cover"
                                    onClick={() => showFullScreenImage(image.image_data)} // 이미지 클릭 시 전체 화면으로 보기
                                />
                                <div className="flex justify-between items-center w-full mt-2 text-gray-600">
                                    <p className="text-gray-600">
                                        {image.created_at.split('T')[0]} {/* 이미지 생성 날짜 표시 */}
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
                        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center p-4"
                        onClick={closeFullScreen}
                    >
                        <div className="grid grid-cols-3 gap-0" style={{ width: '80vw', height: '80vh' }}>
                            {Array.from({ length: 9 }).map((_, index) => (
                                <img
                                    key={index}
                                    src={fullScreenImage}
                                    alt="Full Screen Grid"
                                    className="w-full h-full object-cover"
                                />
                            ))}
                        </div>
                    </div>
                )}
                {/* 모달 컴포넌트 렌더링 */}
                <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} onEdit={editCollection} />
                <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} onDelete={deleteCollection} />
                {isAddModalOpen && <CollectionAddModal onClose={closeAddModal} resultId={addCollectionId} />}
            </div>
        </div>
    );
};

export default CollectionName;
