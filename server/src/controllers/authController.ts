import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const login = async (req: Request, res: Response) => {
    try {
        const { outletCode, password } = req.body;
        const user = await User.findOne({ outletCode });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Replace with your JWT token generation logic
        const token = jwt.sign({ outletCode }, 'qr_resetaurant_secret');
        res.status(200).json({ token, userData : {
            outletCode: user.outletCode,
            outletName: user.outletName
        } });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}