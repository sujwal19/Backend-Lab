import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "file.txt");

const data = await fs.readFile(filePath, "utf-8");
console.log(data);

// const data = fs.readFileSync("file.txt", "utf-8");

// fs.readFile("file.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const files = await fs.readdir("./");
// console.log(files);

// const filePath = path.join(__dirname, "data", "file.txt");
// console.log(filePath);
