import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal'; // DeleteModal 컴포넌트를 임포트합니다.
import EditModal from '../components/EditModal'; // EditModal 컴포넌트를 임포트합니다.
import { useParams } from 'react-router-dom';

const CollectionName = () => {
    const { collectionName } = useParams();
    const navigate = useNavigate();

    const [collections, setCollections] = useState([
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-05-30',
            name: 'Collection 1',
        },
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-06-01',
            name: 'Collection 2',
        },
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-06-02',
            name: 'Collection 3',
        },
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-06-03',
            name: 'Collection 4',
        },
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-06-04',
            name: 'Collection 5',
        },
        {
            images: ['https://via.placeholder.com/150'],
            date: '2023-06-04',
            name: 'Collection 6',
        },
    ]);
    const [currentCollection, setCurrentCollection] = useState(null);
    const [pageTitle, setPageTitle] = useState('Collection Name');

    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
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

    return (
        <div className="mx-auto px-0 pt-24 max-w-[85%]">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/MyPage')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-['pretendard-extrabold']">{pageTitle}</h1>
                    <button onClick={() => openEditModal(0)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-7"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-8">
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
                            <div className="flex justify-between items-center w-full mt-2">
                                <p className="text-gray-500">{collection.date}</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event bubbling.
                                        openDeleteModal(index);
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0 a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0 a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-center col-span-6">No collections to display</p> // 콜렉션이 없을 경우 표시
                )}
            </div>
            {fullScreenImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
                    onClick={closeFullScreen}
                >
                    <img
                        src={fullScreenImage}
                        alt="Full Screen"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            )}
            <EditModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} onEdit={updatePageTitle} />
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} onDelete={deleteCollection} />
        </div>
    );
};

export default CollectionName;
