console.log("=============================");
console.log("NODE.JS TIMERS AND CALLBACKS DEMONSTRATION");
console.log("=============================");

function displayMessage() {
    console.log("\nCallback Function Executed Successfully.");
    console.log("Welcome to Full Stack Development Laboratory.");
    console.log("\nProgram Completed");
}

console.log("Program Started....");
console.log("Waiting for 3 seconds....");

setTimeout(displayMessage, 3000);

console.log("\nProgram Executed Successfully.");