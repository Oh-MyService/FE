import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Confirmation"
            className="bg-[#3A57A7] p-4 rounded-lg shadow-lg min-w-sm w-1/6 mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        >
            <div className="flex flex-col items-center justify-center relative p-1 h-full">
                <button
                    onClick={onRequestClose}
                    className="absolute top-0 right-0 text-lg leading-none px-1 py-1"
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
                <div className="mt-4 w-full">
                    <h2 className="text-xl text-white font-['pretendard-semibold'] text-center">Delete?</h2>
                    <div className="text-center mt-6 mb-2 w-full">
                        <button
                            type="button"
                            className="bg-[#303030] hover:bg-gray-500 text-white py-1.5 px-10 md:py-2 md:px-16 rounded-full font-['pretendard-medium']"
                            onClick={() => {
                                onDelete();
                                onRequestClose();
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
