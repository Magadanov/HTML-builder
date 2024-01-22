const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "files");
const copyFolder = path.join(__dirname, "files-copy");


async function clearDirectory(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        files.forEach(async (file) => {
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

async function copyDir() {
    fs.mkdir(copyFolder, { recursive: true }, (err) => {
        if (err) {
            console.log(err)
        }
    });

    await clearDirectory(copyFolder);
    
    fs.readdir(folder, {withFileTypes:true}, (err, files) => {
        files.forEach((file) => {
            const filePath = path.join(folder, file.name);
            const copyFilePath = path.join(copyFolder, file.name);
            fs.copyFile(filePath, copyFilePath, () => {});
        })
    
        if (err) console.log("Error message: ", err);
    })
}

copyDir();