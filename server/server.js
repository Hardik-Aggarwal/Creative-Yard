import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoutes.js"
import cors from 'cors';



dotenv.config();

//database
connectDB();

const app = express();


//middlewares
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );  

app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute);



app.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce")
})

const PORT = process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} in ${process.env.DEV_MODE}`)
})