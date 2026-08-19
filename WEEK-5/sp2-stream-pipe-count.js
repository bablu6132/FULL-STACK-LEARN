const fs = require('fs');

const reader = fs.createReadStream('largefile.txt');
const writer = fs.createWriteStream('copy.txt');
let totalBytes = 0;

reader.on('data', (chunk) => {
    totalBytes += chunk.length;
    console.log('Chunk size:', chunk.length, 'bytes');
});

reader.on('error', (error) => {
    console.error('Read error:', error.message);
});

writer.on('error', (error) => {
    console.error('Write error:', error.message);
});

reader.pipe(writer);

writer.on('finish', () => {
    console.log('Copy completed. Total bytes processed:', totalBytes);
});
