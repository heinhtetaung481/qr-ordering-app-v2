"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { outletCode, password } = req.body;
        const user = yield User_1.default.findOne({ outletCode });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Replace with your JWT token generation logic
        const token = jsonwebtoken_1.default.sign({ outletCode }, 'qr_resetaurant_secret');
        res.status(200).json({ token, userData: {
                outletCode: user.outletCode,
                outletName: user.outletName
            } });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.login = login;
