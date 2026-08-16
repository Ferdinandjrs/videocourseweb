const express = require('express');
const router = express.Router();
const upload = require('../services/uploadService');

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
    }
    res.status(200).json({
      message: 'File berhasil diunggah',
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
      originalName: req.file.originalname
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
