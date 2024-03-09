import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./database.js";

dotenv.config({
    path: ".env",
}); //It helps to load .env fiel
const app =  express()
app.use(express.json())
app.use(cors())


connectDB().
then(()=>{
    const port = process.env.PORT || 5000;
    app.listen(port, ()=>{
        console.log(`Server is running at port: ${port}`);
    });
}).
catch((error)=>{
    console.error("Error in MongoDB starting server", error)
})// We need to tackle error always to debug properly

