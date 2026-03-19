import multer from "multer";

const storage = multer.memoryStorage();

const uploadFileCloud = multer({ storage }).single("file");

export default uploadFileCloud;
