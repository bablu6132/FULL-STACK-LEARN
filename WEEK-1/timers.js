function SetTimeoutExample(consoleTime) {
    console.timeEnd(consoleTime);
}

console.time("TOW SECONDS");

setTimeout(SetTimeoutExample, 2000, "TOW SECONDS");

console.time("THREE SECONDS");

setTimeout(SetTimeoutExample, 3000, "THREE SECONDS");

console.time("FOUR SECONDS");

setTimeout(SetTimeoutExample, 4000, "FOUR SECONDS");

console.time("FIFTY MILLISECONDS");

setTimeout(SetTimeoutExample, 50, "FIFTY MILLISECONDS");