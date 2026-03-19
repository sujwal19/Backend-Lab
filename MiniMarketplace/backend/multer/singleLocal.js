import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const timeStamp = Date.now();

    const extName = file.originalname.split(".").pop();
    const filename = `${timeStamp}.${extName}`;
    cb(null, filename);
  },
});

export const uploadFile = multer({ storage }).single("file");
