//create user (admin)
const express = require("express");
const router = express.Router();
const { getUsers, createUser,verify, deleteUser,login,tokenRefresh,logout } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id",verify,deleteUser)
router.post("/login",login)
router.post("/refresh",tokenRefresh)
router.post("/logout",verify,logout)

module.exports = router;
