import { Request, Response } from "express";
import Order, { IOrder } from "../models/Order";

export const checkout = async (req: Request, res: Response) => {
    // change the data format. incoming data is { item_id: quantity } in objects
    // we need to convert this to an array of objects where { itemId: item_id, quantity: quantity }
    const items = Object.keys(req.body.items).map((key) => {
        return {
            itemId: key,
            quantity: req.body.items[key]
        }
    });
    const order: IOrder = new Order({
        tableNumber: req.body.tableNumber,
        items: items,
        status: "pending"
    });
    console.log(order);
    try {
        const newOrder: IOrder = await order.save();
        res.status(201).json({orderId: newOrder._id});
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}