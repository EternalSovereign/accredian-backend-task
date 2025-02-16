const express = require("express");
const router = express.Router();
const referralController = require("../controllers/referralController");

// Define routes for referral operations
router.post("/", referralController.createReferral);

module.exports = router;
