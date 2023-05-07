const fs = require('fs');
const path = require('path');
const { readdir } = require('node:fs/promises');


const folder = path.join(__dirname, 'files');

function createCopyFolder(nameCopyFolder) {
    fs.mkdir(path.join(__dirname, nameCopyFolder), { recursive: false }, err => {
        if (err) {
            console.log(`Папка ${nameCopyFolder} уже существует`);
            return
        }
        console.log(`Папка ${nameCopyFolder} была создана`);
        
    });
} 

async function readDir(folder, nameCopyFolder) {
    try {
        const files = await readdir(folder);
        for (const file of files) {

            const filePath = path.join(folder, file);
            const copyFilePath = path.join(__dirname, nameCopyFolder, file);
            const inputFile = fs.createReadStream(filePath);
            const outputFile = fs.createWriteStream(copyFilePath);

            inputFile.on('data', chunk => {
                outputFile.write(chunk);
                console.log(`Файл ${file} был скопирован`)
            });
        }
    } catch (err) {
        console.error(err);
    }
}

(function copyDir() {
    createCopyFolder('files-copy');
    readDir(folder, 'files-copy');
}())