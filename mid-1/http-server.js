import { createServer } from "http";

const server = createServer((req,res) => {
    res.write("HELLO WORLD!");
    res.end();
});

server.listen(3000, () =>{
    console.log("Server is running on port 3000");
});

//http://localhost:3000/