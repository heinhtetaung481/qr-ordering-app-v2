import { Request, Response } from "express";
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const addCategory = async (req: Request, res: Response) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}