const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.post('/login', userController.login);
router.post('/register', userController.create);

// Protected routes
router.get('/', verifyToken, verifyAdmin, userController.getAll);
router.get('/:id', verifyToken, userController.getById);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, verifyAdmin, userController.delete);

module.exports = router;