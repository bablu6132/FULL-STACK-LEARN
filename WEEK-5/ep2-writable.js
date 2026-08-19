const fs = require('fs');

const writer = fs.createWriteStream('ep2-output.txt');

writer.write('This is the first line.\n');
writer.write('This data is written using a Writable Stream.\n');
writer.end('Writing completed successfully.\n');

writer.on('finish', () => {
    console.log('Data written successfully to ep2-output.txt.');
});

writer.on('error', (error) => {
    console.error('Error:', error.message);
});
