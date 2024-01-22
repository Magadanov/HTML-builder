const fs = require("fs");
const path = require("path");

const secretFolder = path.join(__dirname, "secret-folder");

fs.readdir(secretFolder, {withFileTypes:true}, (err, files) => {
    if (err) console.log(err);
    files.forEach((file)=>{
        if(file.isFile()) {
            const ext = path.extname(file.name);
            const basename = path.basename(file.name, ext);
            fs.stat(path.join(secretFolder, file.name), (err, stats) => {
                const stat = stats.size / 1024;
                console.log(`${basename} - ${ext} - ${stat.toFixed(2)}kb`)
            })
        }
    })
})