import React, { useState } from "react";

const create = () => {
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
  });

  const inputHandler = (e) => {
    let { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData.image, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      caption: "",
      image: "",
    });
  };
  return (
    <div className="w-2/5 mx-auto border-r border-gray-400 h-screen">
      <form onSubmit={OnSubmitHandler}>
        <h2 className="text-center mt-10">Create Your Own Posts Here...</h2>
        <div className="mt-5 p-4">
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            name="caption"
            onChange={inputHandler}
            value={formData.caption}
            className="w-full px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Add a caption here..."
          />
        </div>
        <div className="mt-5 p-4">
          <label className="block font-medium text-gray-700 mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={inputHandler}
            className="hidden"
          />

          <label
            htmlFor="image"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4H3v-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10V4a1 1 0 011-1h8a1 1 0 011 1v6m-4 4v4m0 0l-2-2m2 2l2-2"
              />
            </svg>
            <span className="text-blue-500 font-semibold">Click to Upload</span>
            <span className="text-gray-500 text-sm mt-1">
              PNG, JPG, JPEG up to 5MB
            </span>
          </label>
        </div>

        <div className="flex justify-end p-5">
          <button className="px-10 py-2 bg-black text-white rounded-2xl">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default create;
