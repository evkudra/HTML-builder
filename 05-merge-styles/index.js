const fs = require('fs');
const path = require('path');
const { readdir } = require('node:fs/promises');


const styles = path.join(__dirname, 'styles');


(async function readDir() {
    try {
        const files = await readdir(styles);
        const copyFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
        let array = [];
        for (const file of files) {
            
            const filePath = path.join(styles, file);
            const extName = path.extname(filePath).slice(1);
            
            
            if (extName === 'css') {

                const inputFile = fs.createReadStream(filePath);
                const outputFile = fs.createWriteStream(copyFilePath);

                inputFile.on('data', chunk => {
                    array.push(chunk.toString());
                    outputFile.write(array.join(''))
                });
                
                console.log(`Файл ${file} был записан в bundle.css`)
            }
        }
    } catch (err) {
        console.error(err);
    }
}())
