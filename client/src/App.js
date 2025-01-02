import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

const App = () => {
  const [slides, setSlides] = useState([
    { text: "Content goes here...", name: "John Crickett", textColor: "#000000", backgroundColor: "#87CEFA", fontFamily: "Arial", fontSize: 24, backgroundImage: null },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide] = { ...updatedSlides[currentSlide], [field]: value };
    setSlides(updatedSlides);
  };

  const addSlide = () => {
    setSlides([
      ...slides,
      { text: "", name: "New Slide", textColor: "#000000", backgroundColor: "#FFFFFF", fontFamily: "Arial", fontSize: 24, backgroundImage: null },
    ]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, index) => index !== currentSlide);
      setSlides(updatedSlides);
      setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
    }
  };

  const handleImageUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => handleSlideChange(field, reader.result);
      reader.readAsDataURL(file);
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF({ format: [1080, 1080] });
    slides.forEach((slide, index) => {
      if (index > 0) pdf.addPage();
      pdf.setFillColor(slide.backgroundColor);
      pdf.rect(0, 0, 1080, 1080, "F");

      if (slide.backgroundImage) {
        const img = new Image();
        img.src = slide.backgroundImage;
        pdf.addImage(img, "JPEG", 0, 0, 1080, 1080);
      }

      pdf.setTextColor(slide.textColor);
      pdf.setFont(slide.fontFamily, "normal");
      pdf.setFontSize(slide.fontSize);
      pdf.text(slide.text, 50, 540); // Example coordinates
      pdf.text(slide.name, 50, 60); // Example coordinates
    });

    pdf.save("carousel.pdf");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      {/* Slide Preview */}
      <div
        style={{
          width: "1080px",
          height: "1080px",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: slides[currentSlide].backgroundColor,
          color: slides[currentSlide].textColor,
          fontFamily: slides[currentSlide].fontFamily,
          fontSize: `${slides[currentSlide].fontSize}px`,
          position: "relative",
          backgroundImage: slides[currentSlide].backgroundImage ? `url(${slides[currentSlide].backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Profile Section */}
        <div style={{ display: "flex", alignItems: "center", position: "absolute", top: "20px", left: "20px" }}>
          <span style={{ fontWeight: "bold" }}>{slides[currentSlide].name}</span>
        </div>

        {/* Content Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {slides[currentSlide].text}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}>&lt; Previous</button>
        <button onClick={addSlide}>Add Slide</button>
        <button onClick={deleteSlide}>Delete Slide</button>
        <button onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}>Next &gt;</button>
      </div>

      {/* Input Fields */}
      <input
        type="text"
        placeholder="Slide Text"
        value={slides[currentSlide].text}
        onChange={(e) => handleSlideChange("text", e.target.value)}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px", width: "300px" }}
      />
      <input
        type="text"
        placeholder="Name"
        value={slides[currentSlide].name}
        onChange={(e) => handleSlideChange("name", e.target.value)}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px", width: "300px" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload("backgroundImage", e)}
        style={{ marginTop: "10px" }}
      />

      {/* Export to PDF */}
      <button onClick={exportToPDF} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
        Export to PDF
      </button>
    </div>
  );
};

export default App;
