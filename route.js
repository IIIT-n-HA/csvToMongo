// file for setting up the routes.
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadFile, getFileDetails } = require("./controller.js");
const upload = multer({ dest: "/uploads" });

router.post("/upload", upload.single("csvFile"), uploadFile); // post router with multer middleware "upload" for uploading the file.
router.get("/trade", getFileDetails); // get router for fetching the details

module.exports = router;
