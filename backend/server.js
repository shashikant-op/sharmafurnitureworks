const app=require("./app");
const dotenv=require("dotenv");
const databaseconnection=require("./config/database");
const { exists } = require("./models/productmodel");
dotenv.config({path:"backend/config/config.env"})
const cors=require("cors");
//database connection
databaseconnection();

//uncaught rejection
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log(`server is shutting down due to uncaught error`);
    process.exit(1);
})

const PORT=process.env.PORT || 8080;
const server= app.listen( PORT,()=>{
    console.log(`app is listning on port ${PORT}`)
})

//unhandled  rejection
process.on("unhandledRejection",(err)=>{
    console.log(`error :${err.message}`);
    console.log(`server shutting down due to unhandled promise rejection ${err.stack}`);

    server.close(()=>{
        process.exit(1);
    })
})