const express = require("express");
const {
  createPod,
  getPods,
  deletePod,
} = require("../controllers/podController");

const router = express.Router();

router.post("/", createPod);
router.get("/", getPods);
router.delete("/:id", deletePod);

module.exports = router;
