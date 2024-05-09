import mongoose, { Schema, Document } from 'mongoose';

// Define menu interface
export interface IMenu extends Document {
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

// Define menu schema
const MenuSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }
});

export default mongoose.model<IMenu>('Menu', MenuSchema);