import multer from "multer";

const storage = multer.memoryStorage();

const uploadMultipleCloud = multer({ storage }).array("files", 10);

export default uploadMultipleCloud;
