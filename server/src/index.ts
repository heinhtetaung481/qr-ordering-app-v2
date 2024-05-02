import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// MongoDB connection
const uri:string = process.env.MONGODB_URI ?? "";
mongoose.connect(uri);

// Middleware to check database connection
app.use((req:Request, res:Response, next:Function) => {
    if(mongoose.connection.readyState != 1) {
        res.status(500).send("Database connection error");
    }else{
        next();
    }
})

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})