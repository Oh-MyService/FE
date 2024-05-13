import React from 'react';
import Modal from 'react-modal';

// App element for accessibility
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Modal"
            className="bg-[#3A57A7] p-9 rounded shadow-lg w-1/5 relative" // Added relative for positioning the close button
            overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        >
            <button
                className="absolute top-0 right-0 m-3 text-white text-xl leading-none px-3 py-1 border-none bg-transparent"
                onClick={onClose}
                aria-label="Close Modal"
            >
                ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-white">Create New Collection</h2>
            <form>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Collection Name"
                />

                <button
                    type="button"
                    className="mt-4 bg-[#303030] hover:bg-[#454545] text-white font-bold py-2 px-4 rounded mx-auto block"
                    onClick={onClose}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
};

export default CustomModal;
