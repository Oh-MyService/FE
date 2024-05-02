import React, { useState } from 'react';

const CreateImage = () => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Submitted: ' + inputText);
    };

    return (
        <div className="flex flex-col items-start p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="border-2 border-gray-300 p-2 w-80"
                    placeholder="프롬프트 작성 ex)cat"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateImage;
