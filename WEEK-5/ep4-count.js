const fs = require('fs');

const reader = fs.createReadStream('ep4-input.txt');
let totalBytes = 0;

reader.on('data', (chunk) => {
    totalBytes += chunk.length;
});

reader.on('end', () => {
    console.log('Total bytes processed:', totalBytes);
});

reader.on('error', (error) => {
    console.error('Error:', error.message);
});
