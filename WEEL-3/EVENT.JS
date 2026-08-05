const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

console.log("==================================");
console.log("NODE.JS EVENTEMITTER DEMONSTRATION");
console.log("Welcome to Full Stack Development Laboratory\n");

eventEmitter.on('greet', () => {
    console.log('Event Listener Executed');
    console.log('Welcome to event-driven programming');
});

eventEmitter.emit('greet');

