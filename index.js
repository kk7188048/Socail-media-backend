import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./database.js";
import { app } from "./app.js";

dotenv.config({
    path: ".env",
}); //It helps to load .env fiel

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

