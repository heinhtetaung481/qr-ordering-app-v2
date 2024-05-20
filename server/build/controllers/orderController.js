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
exports.updateOrder = exports.getOrders = exports.checkout = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Menu_1 = __importDefault(require("../models/Menu"));
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // change the data format. incoming data is { item_id: quantity } in objects
    // we need to convert this to an array of objects where { itemId: item_id, quantity: quantity }
    const items = Object.keys(req.body.items).map((key) => {
        return {
            itemId: key,
            quantity: req.body.items[key]
        };
    });
    const order = new Order_1.default({
        tableNumber: req.body.tableNumber,
        items: items,
        status: "pending"
    });
    console.log(order);
    try {
        const newOrder = yield order.save();
        res.status(201).json({ orderId: newOrder._id });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
exports.checkout = checkout;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let orders;
        console.log(req.query.tableNumber);
        if (req.query.tableNumber) {
            orders = yield Order_1.default.find({ tableNumber: req.query.tableNumber });
        }
        else {
            orders = yield Order_1.default.find();
        }
        // replace the item id with the actual item object
        for (const order of orders) {
            for (const item of order.items) {
                const menuItem = yield Menu_1.default.findById(item.itemId);
                if (menuItem) {
                    item.itemId = menuItem.name;
                }
            }
        }
        console.log(orders);
        res.status(200).json(orders);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.getOrders = getOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order_1.default.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "Order updated successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.updateOrder = updateOrder;
