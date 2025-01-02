// SlidePreview.js
import React, { useState } from 'react';

const SlidePreview = () => {
  const [text, setText] = useState("Welcome to LinkedIn Carousel!"); // Default text
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [name, setName] = useState(""); // State for user's name/handle

  // Handle text change for carousel
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative bg-gray-200" style={{ width: "1080px", height: "1080px" }}>
        
        {/* Profile Image */}
        <div className="absolute top-4 left-4">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white text-xl">+ </span>
            </div>
          )}
        </div>

        {/* Name/Handle */}
        {name && (
          <div className="absolute top-20 left-4 text-white text-xl font-semibold">
            {name}
          </div>
        )}

        {/* Carousel Text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center"
          style={{
            fontSize: "32px",
            color: "#333",
            fontWeight: "bold",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            paddingTop: profileImage ? '80px' : '20px', // Make space for profile image
          }}
        >
          {text}
        </div>
      </div>

      {/* Text Input */}
      <textarea
        className="mt-4 w-full p-2 border border-gray-300 rounded"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here"
        rows={5}
        style={{ maxWidth: "1080px" }}
      />

      {/* Name Input */}
      <input
        className="mt-4 w-full p-2 border border-gray-300 rounded"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name or handle"
        style={{ maxWidth: "1080px" }}
      />

      {/* Profile Image Upload */}
      <input
        className="mt-4"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default SlidePreview;
