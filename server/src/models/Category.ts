import mongoose, { Schema, Document } from 'mongoose';

// Define category interface
export interface ICategory extends Document {
    name: string;
}

// Define category schema
const CategorySchema: Schema = new Schema({
    name: { type: String, required: true }
});

export default mongoose.model<ICategory>('Category', CategorySchema);