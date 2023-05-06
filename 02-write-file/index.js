const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;


const textFilePath = path.join(__dirname, 'text.txt');
const textFile = fs.createWriteStream(textFilePath);
stdout.write('Ввeдите текст \n');
stdin.on('data', data => {
    if (data.includes('exit')) process.exit();
    textFile.write(data)
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Файл записан'));