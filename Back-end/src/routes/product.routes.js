const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // Tăng lên 50MB
      files: 5
    }
  });

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Protected routes (admin only)
router.use(verifyToken, verifyAdmin);
router.get('/', productController.getAll);
router.post('/create', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.patch('/:id/stock', productController.updateStock);
router.patch('/:id/favorite', productController.toggleFavorite);
router.delete('/:id/images/:filename', productController.deleteImage);

module.exports = router;