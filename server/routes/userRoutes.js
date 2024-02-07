
const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controller/userController");

//router object
const router = express.Router();

//get all user || GET
router.get('/all-users', getAllUsers);

//Create User ||POST
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", loginController);

module.exports = router;
