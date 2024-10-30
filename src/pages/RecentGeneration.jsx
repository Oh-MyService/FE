import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import CollectionAddModal from '../components/CollectionAddModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SkeletonCard = () => (
    <div className="flex flex-col items-center cursor-pointer relative aspect-square w-full">
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
            <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex space-x-2">
                <div className="h-6 w-6 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-6 w-6 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-6 w-6 bg-gray-300 animate-pulse rounded"></div>
            </div>
        </div>
    </div>
);

const SkeletonGroup = () => (
    <div className="flex flex-col justify-center mt-2 w-full bg-gray-200 p-5 rounded-lg shadow-md my-4">
        <div className="h-8 w-32 bg-gray-300 rounded-full mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-2">
            {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    </div>
);

const RecentGeneration = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    // 모달 및 기타 상태 관리
    const [items, setItems] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addCollectionId, setAddCollectionId] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [fullScreenImageId, setFullScreenImageId] = useState(null);

    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);

    // '맨위로가기' 버튼 가시성 상태 관리
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    // 프롬프트 데이터 상태 관리
    const [promptData, setPromptData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // '맨위로가기' 버튼 클릭 핸들러
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 최근 생성 이미지 불러오기
    useEffect(() => {
        const fetchAllImages = async (userId) => {
            try {
                const response = await fetch(`http://118.67.128.129:28282/api/results/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    let data = await response.json();
                    const sortedItems = data.results.sort((a, b) => b.id - a.id);
                    setItems(sortedItems);
                } else {
                    throw new Error('Failed to fetch images');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchAllImages(userId);
        } else {
            console.error('No userId found in localStorage');
            setIsLoading(false);
        }
    }, [userId, token]);

    // 프롬프트 정보를 불러오는 함수
    const handleIconClick = async () => {
        if (showPopup) {
            setShowPopup(false); // 팝업이 열려 있으면 닫기
            return;
        }
        try {
            const response = await fetch(`http://118.67.128.129:28282/api/results/${fullScreenImageId}/prompt`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

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

    // 팝업을 닫는 함수
    const closePopup = (e) => {
        e.stopPropagation();
        setShowPopup(false);
    };

    // 이미지 클릭 시 전체 화면
    const showFullScreenImage = (imageUrl, imageId) => {
        setFullScreenImage(imageUrl);
        setFullScreenImageId(imageId);
        setShowPopup(false);
    };

    const closeFullScreen = () => {
        setFullScreenImage(null);
        setFullScreenImageId(null);
    };

    // 이미지 삭제
    const openDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => setDeleteModalOpen(false);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://118.67.128.129:28282/api/results/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                setDeleteId(null);
                closeDeleteModal();
            } else {
                console.error('Failed to delete images');
            }
        } catch (error) {
            console.error('Error delete items:', error);
        }
    };

    // 이미지 컬렉션에 추가
    const openAddModal = (id) => {
        setAddCollectionId(id);
        setAddModalOpen(true);
    };

    const closeAddModal = () => setAddModalOpen(false);

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

    // 최신순 정렬을 위한 그룹화
    const groupItemsByDate = (items) => {
        const groupedItems = {};
        items.forEach((item) => {
            const date = item.created_at.split('T')[0];
            if (!groupedItems[date]) {
                groupedItems[date] = [];
            }
            groupedItems[date].push(item);
        });
        return groupedItems;
    };

    const groupedItems = groupItemsByDate(items);
    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="bg-[#F2F2F2] min-h-screen pb-5">
            <div className="mx-auto px-4 pt-24 max-w-[85%]">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/my-page')}>
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
                        <h1 className="text-3xl font-['pretendard-extrabold']">최근 생성 패턴</h1>
                    </div>
                </div>
                {isLoading ? (
                    <div>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <SkeletonGroup key={index} />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <p className="text-center font-['pretendard-extrabold'] text-5xl mb-4 text-black leading-snug">
                            생성된 패턴이 없습니다. <br />
                            지금 만들러 가보세요!
                        </p>
                        <button
                            onClick={() => navigate('/create-image')}
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
                                            src={item.image_data}
                                            alt={'Image ID: ' + item.id}
                                            className="w-full h-full object-cover"
                                            effect="blur"
                                            onClick={() => showFullScreenImage(item.image_data, item.id)}
                                        />
                                        <div className="flex justify-end items-center w-full mt-2 font-['pretendard-medium'] text-gray-600">
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
                    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[1000]">
                        <div
                            className="flex space-x-4"
                            style={{ maxWidth: '75vw', maxHeight: '75vh', transform: 'translateY(-26px)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* 원본 이미지 */}
                            <div className="flex flex-col items-start " style={{ width: '25%', height: '100%' }}>
                                <p className="text-white font-['pretendard-semibold'] px-2 py-1 rounded mb-2">
                                    Original Image
                                </p>
                                <div className="flex-shrink-0 w-full h-full">
                                    <img
                                        src={fullScreenImage}
                                        alt="Original Image"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            {/* 3x3 타일링된 이미지 */}
                            <div className="flex flex-col items-start" style={{ width: '50%', height: '100%' }}>
                                <p className="text-white font-['pretendard-semibold'] px-2 py-1 rounded mb-2">
                                    3×3 Tiled Pattern
                                </p>
                                <div className="grid grid-cols-3 gap-0 w-full h-full">
                                    {Array.from({ length: 9 }).map((_, index) => (
                                        <img
                                            key={index}
                                            src={fullScreenImage}
                                            alt="Tiled Pattern"
                                            className="w-full h-full object-contain"
                                        />
                                    ))}
                                </div>
                            </div>
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
                                <h3 className="text-lg font-['pretendard-bold'] mb-2 text-left">Prompt</h3>
                                <hr className="my-2 border-gray-300" />
                                <p className="mb-4 text-base text-gray-700 font-['pretendard-medium'] whitespace-pre-wrap  break-words">
                                    {promptData.content.positive_prompt}
                                </p>
                                <h3 className="text-lg font-['pretendard-bold'] mb-2 text-left">Option</h3>
                                <hr className="my-2 border-gray-300" />
                                <table className="w-full text-left border-separate border-spacing-0">
                                    <tbody>
                                        <tr>
                                            <td className="py-1 text-base font-['pretendard-semibold'] pr-2">width</td>
                                            <td className="py-1 text-sm font-['pretendard-medium']">
                                                {promptData.ai_option.width}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 text-base font-['pretendard-semibold'] pr-2">height</td>
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
                                            <td className="py-1 text-base font-['pretendard-semibold'] pr-2">mood</td>
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
                                            <td className="py-1 text-base font-['pretendard-semibold'] pr-2">seed</td>
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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {isAddModalOpen && <CollectionAddModal onClose={closeAddModal} resultId={addCollectionId} />}
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    onDelete={() => handleDelete(deleteId)}
                />
            </div>
            {/* 맨위로 버튼 */}
            {showScrollTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-[#3A57A7] p-3 rounded-full shadow-lg hover:bg-[#213261] transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="3"
                        stroke="currentColor"
                        className="size-6 text-white"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default RecentGeneration;
