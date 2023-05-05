const fs = require('fs');
const path = require('path');


const textFile = path.join(__dirname, 'text.txt')
const readableStream = fs.createReadStream(textFile, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
readableStream.on('end', () => console.log('Файл прочитан'));