// CarouselGenerator.js (React Component)
import React, { useState } from 'react';
import axios from 'axios';

const CarouselGenerator = () => {
  const [slides, setSlides] = useState([]);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    setSlides(e.target.files);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('text', text);
    for (let i = 0; i < slides.length; i++) {
      formData.append('slides', slides[i]);
    }

    const response = await axios.post('http://localhost:5000/generate-carousel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carousel.pdf';
    link.click();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">LinkedIn Carousel Generator</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 border border-gray-300 mb-4"
        placeholder="Enter text for carousel"
      />
      <input type="file" multiple onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default CarouselGenerator;
