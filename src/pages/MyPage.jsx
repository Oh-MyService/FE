import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewCollectionModal from '../components/NewCollectionModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const skeletonCard = 'animate-pulse bg-gray-300 rounded';

const Mypage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const [recentImages, setRecentImages] = useState([]);
    const [collections, setCollections] = useState([]);

    // 모달 상태 관리
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 최근 생성 이미지 불러오기
        const fetchRecentImages = async () => {
            try {
                let response = await fetch(`http://118.67.128.129:28282/api/results/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();

                    // data.results가 배열인지 확인
                    if (Array.isArray(data.results)) {
                        const sortedImages = data.results.sort((a, b) => b.id - a.id).slice(0, 5);
                        setRecentImages(sortedImages);
                    } else {
                        console.error('results is not an array', data);
                    }
                } else {
                    console.error('Failed to fetch recent images');
                }
            } catch (error) {
                console.error('Error fetching recent images:', error);
            }
        };

        // 컬렉션 정보 불러오기
        const fetchCollections = async () => {
            try {
                const response = await fetch(`http://118.67.128.129:28282/api/collections/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // 컬렉션에 저장된 이미지 불러오기
                    // collection_list가 배열인지 확인
                    if (data.collection_list && Array.isArray(data.collection_list)) {
                        const collectionsData = await Promise.all(
                            data.collection_list.map(async (collection) => {
                                const imagesResponse = await fetch(
                                    `http://118.67.128.129:28282/api/collections/${collection.collection_id}/images`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );

                                const imagesData = imagesResponse.ok ? await imagesResponse.json() : { images: [] };

                                return {
                                    id: collection.collection_id,
                                    name: collection.collection_name,
                                    images: imagesData.images.reverse(), // 역순 정렬(최신순)
                                    createdAt: collection.created_at,
                                };
                            })
                        );

                        // 최신순 정렬
                        collectionsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setCollections(collectionsData.slice(0, 5)); // 5개의 컬렉션만 표시
                    } else {
                        console.error('collection_list is not an array', data);
                    }
                } else {
                    console.error('Failed to fetch collections');
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchRecentImages(), fetchCollections()]);
            setIsLoading(false);
        };

        fetchData();
    }, [token, userId]);

    // 모달 열기 및 닫기
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    // 컬렉션 생성 처리
    const handleCreateCollection = async (collectionName) => {
        const newCollection = {
            name: collectionName,
            images: Array(4).fill({ image_data: '' }),
        };

        try {
            const response = await fetch('http://118.67.128.129:28282/api/collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams({
                    collection_name: collectionName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCollections([newCollection, ...collections]);
                closeCreateModal();
            } else {
                console.error('Failed to create collection:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div className="flex justify-start items-start bg-[#F2F2F2] min-h-screen">
            <div className="flex flex-col text-left mx-auto my-auto p-4 sm:p-8 mt-20">
                <div className="flex items-center">
                    <button
                        className="bg-transparent p-2 flex items-center"
                        onClick={() => navigate('/recent-generation')}
                    >
                        <h2 className="text-3xl font-['pretendard-extrabold'] mb-3">최근 생성 패턴</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3.3"
                            stroke="currentColor"
                            className="w-8 h-8 mb-3 ml-2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10 rounded-lg">
                    {isLoading ? (
                        Array(5)
                            .fill(0)
                            .map((_, index) => <div key={index} className={`${skeletonCard} w-60 h-60`}></div>)
                    ) : recentImages.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center w-60 h-60 bg-gray-300"
                            onClick={() => navigate('/create-image')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-12 h-12 mb-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                />
                            </svg>
                            <p className="text-center font-['pretendard-medium']">생성된 패턴이 없습니다.</p>
                        </div>
                    ) : (
                        recentImages.map((image, index) => (
                            <div
                                key={index}
                                className="overflow-hidden w-60 h-60 cursor-pointer"
                                onClick={() => navigate('/recent-generation')}
                            >
                                <img
                                    src={image.image_data}
                                    alt={`Recent Image ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="flex items-center">
                    <button className="bg-transparent p-2 flex items-center" onClick={() => navigate('/my-collection')}>
                        <h2 className="text-3xl font-['pretendard-extrabold'] mb-3 mt-4">아카이브</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3.3"
                            stroke="currentColor"
                            className="w-8 h-8 mt-1 ml-2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {isLoading ? (
                        Array(5)
                            .fill(0)
                            .map((_, index) => <div key={index} className={`${skeletonCard} w-60 h-60`}></div>)
                    ) : collections.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center w-60 h-60 bg-gray-300 cursor-pointer"
                            onClick={() => navigate('/my-collection')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-12 h-12 mb-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                />
                            </svg>
                            <p className="text-center font-['pretendard-medium']">생성된 아카이브가 없습니다.</p>
                        </div>
                    ) : (
                        collections.map((collection, index) => (
                            <div key={index} className="flex flex-col items-center relative">
                                <div className="grid grid-cols-2 gap-1 w-60 h-60">
                                    {collection.images
                                        .concat(
                                            Array(Math.max(0, 4 - collection.images.length)).fill({
                                                image_data: '',
                                            })
                                        )
                                        .slice(0, 4)
                                        .map((image, idx) => (
                                            <div key={idx} className="relative w-full" style={{ aspectRatio: '1/1' }}>
                                                {image.image_data ? (
                                                    <img
                                                        src={image.image_data}
                                                        alt={`${collection.name} Image ${idx}`}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                        onError={(e) =>
                                                            (e.target.src = 'https://via.placeholder.com/150')
                                                        }
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                                <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium']">
                                    <p>{collection.name}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <NewCollectionModal
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                    onCreate={handleCreateCollection}
                />
            </div>
        </div>
    );
};

export default Mypage;
