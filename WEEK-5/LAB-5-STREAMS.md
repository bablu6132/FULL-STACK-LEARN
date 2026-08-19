# LAB-5 (E5): Node.js Streams

## At-Home Sample Programs

### SP1. Read and Write a File Chunk by Chunk

**Program:** [sp1-stream-copy.js](sp1-stream-copy.js)

#### Code

```js
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
```

#### Sample `input.txt`

```text
Streams process data in small chunks.
This is SP1 input.
```

The program creates `output.txt` with the same content. Because the default read-stream buffer is large enough for this small file, the usual output contains one data event. A larger file can produce several chunks.

#### Expected terminal output

```text
Chunk received: "Streams process data in small chunks.\nThis is SP1 input.\n"
Reading completed. Data written to output.txt.
```

#### Explanation

`fs.createReadStream()` opens `input.txt` for incremental reading. Whenever a piece of data is available, the `data` event supplies it as `chunk`, and the chunk is sent to the writable stream. The `end` event shows that reading is complete and closes the writer with `writer.end()`. The `error` handlers report problems such as a missing input file or an invalid output path.

#### Three challenging test cases

1. **Missing input file:** Rename `input.txt` and run `node sp1-stream-copy.js`. Expected result: `Read error: ENOENT: no such file or directory, open 'input.txt'` (the exact wording may vary by Node.js version). No input data is copied.
2. **Empty input file:** Create a zero-byte `input.txt` and run the program. Expected result: no `Chunk received` line, followed by `Reading completed. Data written to output.txt.`; `output.txt` is also empty.
3. **Output permission/path error:** Set the output location to a protected or invalid location, for example change the writer line to `fs.createWriteStream('C:\\Windows\\System32\\stream-output.txt')` without suitable permission. Expected result: `Write error: EACCES` or `Write error: EPERM` (the exact code depends on Windows permissions).

---

### SP2. Copy a Large File Using `pipe()`

**Basic program:** [sp2-stream-pipe.js](sp2-stream-pipe.js)

#### Code

```js
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
```

#### Sample `largefile.txt`

```text
Streams are useful for processing large files.
Instead of loading the complete file into memory, Node.js processes one chunk at a time.
This sample demonstrates copying data with pipe().
```

#### Expected terminal output

```text
Large file copied successfully to copy.txt.
```

#### Explanation

The readable stream is connected directly to the writable stream with `reader.pipe(writer)`. `pipe()` automatically transfers every chunk, manages the flow rate, and ends the destination when the source ends. The `finish` event confirms that the destination has received all data.

#### Improved version with byte count

**Program:** [sp2-stream-pipe-count.js](sp2-stream-pipe-count.js)

```js
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
```

For the supplied sample, the expected final line is `Copy completed. Total bytes processed: 213` when the file uses the shown LF line endings. The chunk-size lines can differ because chunk boundaries depend on file size and stream buffering.

#### Three challenging test cases

1. **Missing source:** Rename `largefile.txt` and run `node sp2-stream-pipe.js`. Expected result: `Read error: ENOENT...`; the copy does not complete successfully.
2. **Empty source:** Create a zero-byte `largefile.txt`. Expected result for the basic version: `Large file copied successfully to copy.txt.` and an empty `copy.txt`. For the improved version: `Copy completed. Total bytes processed: 0`, with no chunk-size line.
3. **Destination permission error:** Make `copy.txt` read-only or change the writer path to a protected location. Expected result: `Write error: EACCES` or `EPERM`. The exact message varies by Windows account permissions.

---

## In-Lab Exercise Problems

## EP1. Read a File Using a Readable Stream

**Program:** [ep1-readable.js](ep1-readable.js)

### Problem Description
Read the contents of a file using a Readable Stream and display the data one chunk at a time.

### Problem Analysis

| Item | Description |
|---|---|
| Input | Text file `ep1-input.txt` |
| Processing | Open a Readable Stream and display each `data` chunk |
| Output | File data displayed chunk by chunk and completion message |

### Aim
To read a file incrementally using Node.js `fs.createReadStream()`.

### Algorithm

1. Import the `fs` module.
2. Create a Readable Stream for `ep1-input.txt`.
3. Attach a `data` event handler and display each chunk.
4. Attach an `end` handler and display the completion message.
5. Attach an `error` handler for file-reading errors.

### Code

```js
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
```

### Expected Output

```text
Data chunk: "EP1 reads this file chunk by chunk.\n"
File reading completed.
```

### Explanation/Conclusion
The `data` event is emitted whenever a chunk is available. The `end` event is emitted after all chunks have been read, so the program does not need to load the complete file into memory.

---

## EP2. Write Data Using a Writable Stream

**Program:** [ep2-writable.js](ep2-writable.js)

### Problem Description
Create a file and write text into it using a Writable Stream.

### Problem Analysis

| Item | Description |
|---|---|
| Input | Three text strings in the program |
| Processing | Create a Writable Stream and write the strings |
| Output | `ep2-output.txt` containing the written text and a success message |

### Aim
To create and write a file using Node.js `fs.createWriteStream()`.

### Algorithm

1. Import the `fs` module.
2. Create a Writable Stream for `ep2-output.txt`.
3. Write two lines with `writer.write()`.
4. Write the final line and close the stream with `writer.end()`.
5. Use `finish` to display success and `error` to report failure.

### Code

```js
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
```

### Expected Output

```text
Data written successfully to ep2-output.txt.
```

The generated `ep2-output.txt` contains:

```text
This is the first line.
This data is written using a Writable Stream.
Writing completed successfully.
```

### Explanation/Conclusion
A Writable Stream accepts data from the program and writes it to a destination. `writer.end()` marks the end of input, and `finish` is emitted after all data has been flushed to the file.

---

## EP3. Copy a File Using `pipe()`

**Program:** [ep3-pipe.js](ep3-pipe.js)

### Problem Description
Copy data from one file to another using Readable and Writable Streams connected with `pipe()`.

### Problem Analysis

| Item | Description |
|---|---|
| Input | Source file `ep3-source.txt` |
| Processing | Read source chunks and pipe them to the destination stream |
| Output | `ep3-destination.txt` containing an exact copy |

### Aim
To copy file data efficiently using the `pipe()` method.

### Algorithm

1. Import the `fs` module.
2. Create a Readable Stream for the source file.
3. Create a Writable Stream for the destination file.
4. Connect the streams using `reader.pipe(writer)`.
5. Handle errors and display a message when the writer emits `finish`.

### Code

```js
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
```

### Expected Output

```text
Data copied successfully using pipe().
```

### Explanation/Conclusion
`pipe()` transfers chunks from a Readable Stream to a Writable Stream automatically. It also handles flow control and ends the destination after the source stream finishes, making file copying simple and memory-efficient.

---

## EP4. Count Total Data Processed

**Program:** [ep4-count.js](ep4-count.js)

### Problem Description
Count the total number of bytes processed while reading a file with a Readable Stream.

### Problem Analysis

| Item | Description |
|---|---|
| Input | Text file `ep4-input.txt` |
| Processing | Add the length of every Buffer chunk in the `data` event |
| Output | Total number of bytes after the `end` event |

### Aim
To calculate total file data processed using a Readable Stream.

### Algorithm

1. Import the `fs` module.
2. Set `totalBytes` to zero.
3. Create a Readable Stream for `ep4-input.txt`.
4. Add each chunk's byte length to `totalBytes`.
5. Display the total when the stream emits `end`.
6. Handle any reading error.

### Code

```js
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
```

### Expected Output

```text
Total bytes processed: 34
```

The count is based on UTF-8 bytes and includes the newline character. For non-ASCII text, byte count can be greater than character count.

### Explanation/Conclusion
Each `data` chunk is a Buffer, and `chunk.length` gives its number of bytes. Adding these values gives the total bytes read without storing the entire file.

---

## Viva-Voce Answers

### 1. What is a Stream in Node.js?
A Stream is an object used to read or write data continuously in smaller pieces called chunks. It allows data to be processed while it is still arriving instead of waiting for the complete data set.

### 2. What is a Readable Stream?
A Readable Stream is a source from which data can be read. A file created with `fs.createReadStream()` is a common example.

### 3. What is a Writable Stream?
A Writable Stream is a destination to which data can be written. A file created with `fs.createWriteStream()` is a common example.

### 4. What is the purpose of the `fs` module?
The built-in `fs` module provides file-system operations in Node.js. It supports reading, writing, updating, deleting, and streaming files.

### 5. What does `createReadStream()` do?
`createReadStream()` creates a Readable Stream for a file. It reads the file incrementally and emits events such as `data`, `end`, and `error`.

### 6. What does `createWriteStream()` do?
`createWriteStream()` creates a Writable Stream that writes data to a file. Data can be supplied with `write()`, and `end()` finishes the writing operation.

### 7. What is the `data` event?
The `data` event is emitted whenever a new chunk of data is available from a Readable Stream. Its callback receives the chunk, normally as a Buffer unless an encoding is specified.

### 8. What is the `end` event?
The `end` event is emitted when a Readable Stream has no more data to provide. It is useful for displaying a completion message or performing final calculations.

### 9. What is the `pipe()` method?
`pipe()` connects a Readable Stream to a Writable Stream. It automatically transfers chunks, manages flow control, and normally ends the destination when the source ends.

### 10. Why are Streams memory-efficient?
Streams process only a small portion of a file at a time, so the complete file does not have to be loaded into RAM. This is especially useful for large files, network responses, and video data.

### 11. What is a chunk?
A chunk is one small piece of data delivered by a Stream during one read operation. It is usually a Buffer, and its size can vary according to the stream's buffering settings and the amount of available data.

## How to Run

Open PowerShell in the `WEEL-3` folder and run, for example:

```powershell
node sp1-stream-copy.js
node sp2-stream-pipe.js
node sp2-stream-pipe-count.js
node ep1-readable.js
node ep2-writable.js
node ep3-pipe.js
node ep4-count.js
```

Run each program from this folder because the programs use relative file names. Generated files include `output.txt`, `copy.txt`, `ep2-output.txt`, and `ep3-destination.txt`.
