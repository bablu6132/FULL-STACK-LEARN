const fs = require('fs');

const reader = fs.createReadStream('ep3-source.txt');
const writer = fs.createWriteStream('ep3-destination.txt');

reader.on('error', (error) => {
    console.error('Read error:', error.message);
});

writer.on('error', (error) => {
    console.error('Write error:', error.message);
});

reader.pipe(writer);

writer.on('finish', () => {
    console.log('Data copied successfully using pipe().');
});
