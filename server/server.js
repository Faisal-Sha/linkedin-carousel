// server.js
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));

// POST route to generate the carousel PDF
app.post('/generate-carousel', upload.array('slides', 5), async (req, res) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Example of adding text to the first page, you can extend this to add images
  const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
  const text = req.body.text || 'Welcome to the LinkedIn Carousel!';
  page.drawText(text, { x: 50, y: 350, font });

  // Create and send PDF as response
  const pdfBytes = await pdfDoc.save();
  res.contentType('application/pdf');
  res.send(pdfBytes);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
