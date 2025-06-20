// backend/middleware/multer.js
const multer = require("multer");
const { storage } = require("../utlis/upload");

const upload = multer({ storage });

const fileupload = upload.fields([
  { name: "productimg", maxCount: 5 },
  { name: "productspecificationimg", maxCount: 5 },
]);
module.exports = fileupload; // ✅ export directly
