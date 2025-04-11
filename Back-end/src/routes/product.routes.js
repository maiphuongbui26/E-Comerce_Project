const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Protected routes (admin only)
router.use(verifyToken, verifyAdmin);
router.post('/create', productController.create);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.delete);
router.put('/stock/:id', productController.updateStock);
router.put('/favorite/:id', productController.toggleFavorite);

module.exports = router;