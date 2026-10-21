import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from'./config/db.js';
import express from 'express';
import AuthRoutes from "./routes/AuthRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",AuthRoutes);
app.use("/api/products",productsRoutes);

 app.get('/',(req,res)=>{
    res.send("API is running...");
 });

 connectDB();
 
 app.listen(5001,()=>{
    console.log('server is running at 5001');
 });  