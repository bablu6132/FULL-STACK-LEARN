const fs = require('fs');

const reader = fs.createReadStream('input.txt', { encoding: 'utf8' });
const writer = fs.createWriteStream('output.txt');

reader.on('data', (chunk) => {
    console.log('Chunk received:', JSON.stringify(chunk));
    writer.write(chunk);
});

reader.on('end', () => {
    writer.end();
    console.log('Reading completed. Data written to output.txt.');
});

reader.on('error', (error) => {
    console.error('Read error:', error.message);
    writer.end();
});

writer.on('error', (error) => {
    console.error('Write error:', error.message);
});
