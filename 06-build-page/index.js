const fs = require("fs");
const path = require("path");

const projectPath = path.join(__dirname, "project-dist");
const pathStyles = path.join(__dirname, "styles");
const pathComponents = path.join(__dirname, "components");
const templateHtml = path.join(__dirname, "template.html");
const assetsFolder = path.join(__dirname, "assets");


const pathBundle = path.join(projectPath, "style.css");
const indexHtml = path.join(projectPath, "index.html");
const assets = path.join(projectPath, "assets");

async function clearDirectory(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        files.map(async (file) => {
            const filePath = path.join(dir, file.name);
            if (file.isFile()) {
                fs.unlink(filePath, () => {});
            } else if (file.isDirectory()) {
                await clearDirectory(filePath);
                fs.rmdir(filePath, () => {});
            }
        })
    })

}

async function main() {

    fs.mkdir(projectPath, { recursive: true }, (err) => {
        if (err) {
            console.log(err)
        }
    });

    await clearDirectory(projectPath);
    
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

    fs.cp(assetsFolder, assets, {recursive: true}, () => {});

    fs.readdir(pathComponents, {withFileTypes:true}, (err, files) => {

        const template = fs.promises.readFile(templateHtml).then((temp) => {
            files.forEach((file) => {
                if (file.isFile() && path.extname(file.name) === ".html") {
                    const writeStream = fs.createWriteStream(indexHtml);
                    const basename = path.basename(file.name, path.extname(file.name));
                    const pathHtml = path.join(pathComponents, file.name);
                    const readStream = fs.createReadStream(pathHtml);
                    readStream.on("data", (data) => {
                        temp = temp.toString().replace(`{{${basename}}}`, data.toString());
                    });
                    readStream.on("end", () => { 
                        writeStream.write(temp);
                    });
                }
            })
        })
    
        if (err) console.log("Error message: ", err);
    })
}



main();