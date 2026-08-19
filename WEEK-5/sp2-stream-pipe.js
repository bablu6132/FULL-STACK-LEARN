const fs = require('fs');

const reader = fs.createReadStream('largefile.txt');
const writer = fs.createWriteStream('copy.txt');

reader.on('error', (error) => {
    console.error('Read error:', error.message);
});

writer.on('error', (error) => {
    console.error('Write error:', error.message);
});

reader.pipe(writer);

writer.on('finish', () => {
    console.log('Large file copied successfully to copy.txt.');
});
