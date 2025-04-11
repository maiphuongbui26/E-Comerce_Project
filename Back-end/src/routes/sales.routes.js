const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
router.use(verifyToken, verifyAdmin);

router.post('/create', salesController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/update/:id', salesController.update);
router.delete('/delete/:id', salesController.delete);

module.exports = router;