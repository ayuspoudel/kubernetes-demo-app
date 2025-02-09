const express = require("express");
const { getNodes, registerNode } = require("../controllers/nodeController");

const router = express.Router();

router.get("/", getNodes);
router.post("/", registerNode);

module.exports = router;
