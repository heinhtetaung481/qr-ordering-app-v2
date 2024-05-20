import { Request, Response } from "express";
import Order, { IOrder } from "../models/Order";
import Menu from "../models/Menu";

interface IOrderItem {
    itemId: string;
    quantity: number;
    name?: string;
}

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

export const getOrders = async (req: Request, res: Response) => {
    try {
        let orders: Array<IOrder>;
        console.log(req.query.tableNumber)
        if(req.query.tableNumber){
            orders = await Order.find({ tableNumber: req.query.tableNumber });
        }else{
            orders = await Order.find();
        }
        // replace the item id with the actual item object
        for (const order of orders) {
            for (const item of order.items) {
                const menuItem = await Menu.findById(item.itemId);
                if (menuItem) {
                    item.itemId = menuItem.name;
                }
            }
        }
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        await Order.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}