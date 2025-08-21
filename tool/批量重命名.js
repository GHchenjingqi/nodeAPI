const fs = require('fs');

let files = fs.readdirSync("./files")

files.forEach((file,idx) => {
    fs.renameSync(`./files/${file}`, `./files/${idx + file}`)
});