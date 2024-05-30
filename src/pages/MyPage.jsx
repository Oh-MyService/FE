import React, { useState, useRef } from 'react';
import CustomModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const onChangeImage = (e) => {
        const profileImageFile = e.target.files[0];

        // 만약 파일이 없거나 취소되었을 경우
        if (!profileImageFile) {
            return;
        }

        const profileImageUrl = URL.createObjectURL(profileImageFile);
        setProfileImage(profileImageUrl);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const goToRecentGeneration = () => navigate('/RecentGeneration');
    const goToCollection = () => navigate('/MyCollection');

    const dummyCollections = [
        {
            name: 'Collection 1',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
        },
        {
            name: 'Collection 2',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
        },
        {
            name: 'Collection 3',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
        },
        {
            name: 'Collection 4',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
        },
        {
            name: 'Collection 5',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
        },
    ];
    const [collections, setCollections] = useState(dummyCollections);
    const handleCollectionClick = (collectionName) => {
        // 컬렉션 클릭 시 실행할 작업을 여기에 추가하세요.
        console.log('Clicked on collection:', collectionName);
    };

    return (
        <div className="flex justify-center items-start bg-[#dcdcdd] min-h-screen">
            <div className="flex flex-col my-52 mr-12">
                <input type="file" ref={fileInputRef} onChange={onChangeImage} className="hidden" />
                <div
                    className="overflow-hidden rounded-full w-48 h-48 bg-gray-200 flex justify-center items-center cursor-pointer m-3"
                    onClick={handleImageClick}
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Profile Picture" className="w-full h-full object-cover" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="2 2 20 20"
                            fill="currentColor"
                            className="w-48 h-48"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <div className="text-center font-['pretendard-medium'] m-3">오마이서비스</div>
            </div>

            <div className="flex flex-col text-left my-auto ml-10">
                <div className="flex items-center">
                    <button className="bg-transparent p-2 ml-neg flex items-center" onClick={goToRecentGeneration}>
                        <h2 className="text-3xl font-['pretendard-extrabold'] mb-3">Recent Generation</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3.3"
                            stroke="currentColor"
                            class="w-8 h-8 mb-3 ml-2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden w-60 h-60 bg-slate-400 hover:bg-slate-500 cursor-pointer"
                        ></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <button className="bg-transparent p-2 ml-neg flex items-center" onClick={goToCollection}>
                        <h2 className="text-3xl font-['pretendard-extrabold'] mb-3 mt-4">My Collection</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3.3"
                            stroke="currentColor"
                            class="w-8 h-8 mt-1 ml-2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {collections &&
                        collections.map((collection, index) => (
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
                                            onError={(e) => (e.target.src = 'https://via.placeholder.com/120')}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between items-center w-full mt-2 font-['pretendard-medium']">
                                    <p>{collection.name}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Mypage;
