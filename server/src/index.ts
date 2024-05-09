import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import multer from "multer";
import path from "path";

dotenv.config();

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        // update file name to exclude public folder
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const app = express();
const port = process.env.PORT || 3001;

app.set('upload', upload);

// Serve static files from the 'public' directory
app.use(express.static("public"));

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