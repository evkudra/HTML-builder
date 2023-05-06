const fs = require('fs');
const path = require('path');
const { readdir } = require('node:fs/promises');


const folder = path.join(__dirname, 'secret-folder');

async function readDir(folder) {
    try {
        const files = await readdir(folder, {withFileTypes: true});
        for (const file of files) {
            if (file.isDirectory()) continue
           
            const filePath = path.join(folder, file.name);
            const fileName = path.basename(filePath, path.extname(filePath));
            const fileExtname = path.extname(filePath).slice(1);
            
            fs.stat(filePath, (err, stats) => {
                if (err) console.log(err)
                console.log(`${fileName} - ${fileExtname} - ${stats.size / 1024} Kb`);
            });
        }
    } catch (err) {
        console.error(err);
    }
}
readDir(folder);
