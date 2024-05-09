"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
// Set up multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        // update file name to exclude public folder
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.set('upload', upload);
// Serve static files from the 'public' directory
app.use(express_1.default.static("public"));
// MongoDB connection
const uri = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "";
mongoose_1.default.connect(uri);
// Middleware to check database connection
app.use((req, res, next) => {
    if (mongoose_1.default.connection.readyState != 1) {
        res.status(500).send("Database connection error");
    }
    else {
        next();
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
