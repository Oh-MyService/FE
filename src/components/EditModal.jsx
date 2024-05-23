import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 앱의 Root Element를 설정합니다.

const EditModal = ({ isOpen, onClose, onEdit }) => {
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');

    const handleEdit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        if (!newName.trim()) {
            setError('Name cannot be empty.'); // 공백 입력 에러 처리
            return;
        }
        setError(''); // 에러 상태 초기화
        onEdit(newName);
        setNewName(''); // 입력 필드 초기화
        onClose(); // 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Collection Modal"
            className="bg-[#3A57A7] p-10 rounded-lg shadow-lg w-1/5 relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
        >
            <button
                className="absolute top-0 right-0 m-3 text-white text-xl leading-none px-3 py-1 border-none bg-transparent"
                onClick={onClose}
                aria-label="Close Modal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-2xl text-white font-['pretendard-bold'] mb-4">Edit Collection</h2>
            <form onSubmit={handleEdit}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mt-1 w-full p-2 border border-gray-300 rounded font-['pretendard-medium']"
                    placeholder="New Collection Name"
                    autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                    type="submit"
                    className="mt-7 bg-[#303030] hover:bg-gray-500 text-white py-2 px-16 rounded-full mx-auto block font-['pretendard-medium']"
                >
                    Edit
                </button>
            </form>
        </Modal>
    );
};

export default EditModal;
