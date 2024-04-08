import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import teamRoute from './routes/teamRoute';
import filterRoute from './routes/filterRoute';

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/filter", filterRoute)
app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);


app.get("/api/test", async(req: Request, res: Response)=>{
    res.json({message:"Hello from endpoint!"})
})


app.listen(7000,()=>{
    console.log("server connected");
})