const http= require("http");
const app= require('./app')
const port=3000;

const server= http.createServer(app)
server.listen(port,()=>{
    console.log(`App is Running on Port ${port}`);
})