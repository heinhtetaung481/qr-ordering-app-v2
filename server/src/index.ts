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

// Allow requests from specific origin(s)
const corsOptions = {
    origin: 'http://ec2-13-229-208-54.ap-southeast-1.compute.amazonaws.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})