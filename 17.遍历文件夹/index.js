const path = require("path");
const fs = require("fs");

const readDir = (entry) => {
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach((item) => {
        const location = path.join(entry, item);
        const info = fs.statSync(location);
        if (info.isDirectory()) {
            console.log(`dir: ${location}`);
        } else {
            console.log(`file: ${location}`);
        }
    });
};

readDir(__dirname);
