const fs = require("fs");
const path = require("path");

const projectPath = path.join(__dirname, "project-dist");
const pathStyles = path.join(__dirname, "styles");


const pathBundle = path.join(projectPath, "bundle.css");

    
fs.readdir(pathStyles, {withFileTypes:true}, (err, files) => {
    const writeStream = fs.createWriteStream(pathBundle);

    files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === ".css") {
            const pathCss = path.join(pathStyles, file.name);
            const readStream = fs.createReadStream(pathCss);
            readStream.pipe(writeStream);
        }
    })

    if (err) console.log("Error message: ", err);
})

  
