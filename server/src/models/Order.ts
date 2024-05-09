import mongoose, { Schema, Document } from "mongoose";

// Define order item schema
const OrderItemSchema: Schema = new Schema({
    itemId: String,
    quantity: Number
}, {_id: false});
// Define order interface
export interface IOrder extends Document {
    tableNumber: String;
    items: typeof OrderItemSchema[];
    status: String;
}

// Define order schema
const OrderSchema: Schema = new Schema({
    tableNumber: { type: String, required: true },
    items: [OrderItemSchema],
    status: { type: String, required: true }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
