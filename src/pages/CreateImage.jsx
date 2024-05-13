import React, { useState } from "react";

const CreateImage = () => {
  const [inputText, setInputText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted: " + inputText);

    try {
      // Send the string to process_string
      let response = await fetch("http://192.168.39.100:8000/process_string", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ string_input: inputText }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.text();
      console.log(data);
      setAlertMessage(data);
      alert(data);

      // Now get the image from get_image
      response = await fetch("http://192.168.39.100:8000/get_image");
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageURL(url);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col mx-0 my-auto w-full lg:w-2/3 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <span className="block text-lg font-bold text-left text-slate-700">
              Pattern Generator
            </span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="appearance-none block w-full h-40 sm:h-80 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500 placeholder-top"
              placeholder="ex) cat"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 sm:mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSubmit}
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex-1">
            <span className="block text-lg font-bold text-left text-slate-700">
              Option
            </span>
            <div className="w-full h-40 sm:h-80 bg-gray-200"></div>
          </div>
        </div>

        {imageURL && (
          <img
            id="image"
            src={imageURL}
            alt="Fetched Image"
            className="mt-4 max-w-xs"
          />
        )}
      </div>
      <style jsx>{`
        .placeholder-top::placeholder {
          position: relative;
          top: -130px;
        }
      `}</style>
    </div>
  );
};

export default CreateImage;
