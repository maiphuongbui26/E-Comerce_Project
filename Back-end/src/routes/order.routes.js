const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// User routes
// router.use(verifyToken);
router.post('/create', orderController.create);
router.get('/my-orders', orderController.getUserOrders);
router.get('/:id', orderController.getById);
router.put('/cancel/:id', orderController.cancelOrder);

// Admin routes
router.use(verifyAdmin);
router.get('/', orderController.getAll);
router.put('/status/:id', orderController.updateStatus);

module.exports = router;