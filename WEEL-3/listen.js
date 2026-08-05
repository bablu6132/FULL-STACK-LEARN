const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

console.log("==============================");
console.log("NODE.JS CUSTOM EVENTS DEMONSTRATION");
console.log("==============================\n");
console.log("Welcome to Full Stack Development Laboratory\n");

eventEmitter.on("studentLogin", (name) => {
    console.log("Student Login Event Triggered");
    console.log("Student Name:", name);
});

eventEmitter.on("studentLogin", () => {
    console.log("Attendance Marked Successfully.");
    console.log("Welcome to Full Stack Development Laboratory.");
});

eventEmitter.emit("studentLogin", "pani pixel");
