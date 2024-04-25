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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
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
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server test");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
