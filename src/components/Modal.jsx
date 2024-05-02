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
            className="bg-white p-6 rounded shadow-lg w-1/5"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h2 className="text-lg font-bold mb-4">Create New Collection</h2>
            <form>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Collection Name"
                />

                <button
                    type="button"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    onClick={onClose}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
};

export default CustomModal;
