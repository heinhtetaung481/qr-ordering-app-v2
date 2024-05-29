import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    outletCode: string;
    outletName: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    outletCode: { type: String, required: true },
    outletName: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);