// create model for table collection
import mongoose, { Schema, Document } from 'mongoose';

// Define table interface
export interface ITable extends Document {
    number: string;
    table_reference: string;
    status: string;
}

// Define table schema
const TableSchema: Schema = new Schema({
    number: { type: String, required: true, unique: true},
    table_reference: { type: String, required: true },
    status: { type: String, required: true }
});

// Export table model
export default mongoose.model<ITable>('Table', TableSchema);