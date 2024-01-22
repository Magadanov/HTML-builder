const {stdin, stdout} = process;
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "output.txt");

const outputStream = fs.createWriteStream(outputPath);

stdin.on("data", (data) => {

    if (data.toString().trim() === "exit") {
        process.exit();
    }

    outputStream.write(data);

})

stdin.on("error", (error) => console.log(error));

stdin.on("exit", () => process.exit());