const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const logger = require("../logs/logger");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");

// Public routes
try {
  router.post("/login", userController.login);
  router.post("/register", userController.create);

  // Protected routes
  router.get("/", verifyToken, verifyAdmin, userController.getAll);
  router.get("/:id", verifyToken, userController.getById);
  router.put("/:id", verifyToken, userController.update);
  router.delete("/:id", verifyToken, verifyAdmin, userController.delete);
} catch (error) {
    logger.error("ERROR",{
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });
}

module.exports = router;
