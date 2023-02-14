const express = require("express");
const router = express.Router();
const {
  createBus,
  getBus,
  getBuses,
  deleteBus,
  updateBus,
  createUser,
  getUsers
} = require("../controllers/busController");

//GET all workouts
router.get("/", getBuses);

//GET a single workout
router.get("/:id", getBus);

//POST a new workout
router.post("/", createBus);

//DELETE a workout
router.delete("/:id", deleteBus);

//UPDATE a workout
router.patch("/:id", updateBus);

//create user (admin)
router.get("/register/users",getUsers)
router.post("/register",createUser)


module.exports = router;
