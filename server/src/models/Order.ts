import mongoose, { Schema, Document } from "mongoose";

// Define order item schema
export const OrderItemSchema: Schema = new Schema({
    itemId: String,
    quantity: Number
}, {_id: false});

export interface IOrderItem {
    itemId: string;
    quantity: number;
    name?: string;
}
// Define order interface
export interface IOrder extends Document {
    tableNumber: String;
    items: IOrderItem[];
    status: String;
}

// Define order schema
const OrderSchema: Schema = new Schema({
    tableNumber: { type: String, required: true },
    items: [OrderItemSchema],
    status: { type: String, required: true }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
