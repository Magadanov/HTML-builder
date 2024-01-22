const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt");

const streamReadFile = fs.createReadStream(filePath);

let data = "";

streamReadFile.on("data", (chunk) => {data += chunk});
streamReadFile.on("end", () => {console.log(data)});
streamReadFile.on("error", (error) => {console.log("error", error.message)});