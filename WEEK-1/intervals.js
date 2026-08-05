// const intervalId = setInterval(() => {
//     console.log("Interval executed");
// }, 2000);

// // To clear the interval later, you can use:
// clearInterval(intervalId);

const Id = setInterval(() => {
    console.log("Interval executed");
}, 3000);

setTimeout(() => {
    clearInterval(Id);
    console.log("Interval cleared after 10 seconds");
}, 10000);

