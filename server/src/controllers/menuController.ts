import { Request, Response } from 'express';
import Menu from '../models/Menu';

export const getMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const addMenu = async (req: Request, res: Response) => {
    console.log("addMenu")
    const upload = req.app.get('upload');
    upload.single('image')(req, res, async (err: any) => {
        if (err) {
            console.log(err.message)
            return res.status(500).json({ message: err.message });
        }
        // remove public from path
        const filePath: string | undefined = req.file?.path.replace('public', '');
        const menu = new Menu({
            name: req.body.name,
            price: req.body.price,
            image: filePath,
            category: req.body.category,
            description: req.body.description,
        });
        console.log(menu)
        try {
            const newMenu = await menu.save();
            res.status(201).json(newMenu);
        } catch (error) {
            const err = error as Error;
            console.log(err.message)
            res.status(400).json({ message: err.message });
        }
    });
}

export const updateMenu = async (req: Request, res: Response) => {
    const upload = req.app.get('upload');
    upload.single('image')(req, res, async (err: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        // remove public from path
        const filePath: string | undefined = req.file?.path.replace('public', '');
        try {
            await Menu.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                price: req.body.price,
                image: filePath,
                category: req.body.category,
                description: req.body.description,
            });
            res.status(200).json({ message: "Menu updated successfully" });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    });
}

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const ids = req.body.itemIds;
        const menus = await Menu.find({ _id: { $in: ids } });
        res.status(200).json(menus);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        await Menu.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}