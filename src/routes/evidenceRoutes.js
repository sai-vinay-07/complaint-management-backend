const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const upload = require("../middleware/uploads");

const { uploadEvidence, getEvidence, getUserEvidence } = require("../controllers/evidenceController");
const roleAccess = require("../middleware/roleAccess");

router.post(
    "/upload",
    authMiddleware,
    roleAccess("user"),
    upload.single("file"),
    uploadEvidence
);

router.get(
    "/my-evidence",
    authMiddleware,
    roleAccess("user"),
    getUserEvidence
);

router.get(
    "/:id",
    authMiddleware,
    roleAccess("admin"),
    getEvidence
);

module.exports = router;
