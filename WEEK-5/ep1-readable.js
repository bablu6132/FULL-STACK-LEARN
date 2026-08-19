const fs = require('fs');

const reader = fs.createReadStream('ep1-input.txt', { encoding: 'utf8' });

reader.on('data', (chunk) => {
    console.log('Data chunk:', JSON.stringify(chunk));
});

reader.on('end', () => {
    console.log('File reading completed.');
});

reader.on('error', (error) => {
    console.error('Error:', error.message);
});
