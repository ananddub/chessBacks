import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
import { Status } from 'constant/status';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    pending: Schema.Types.ObjectId[];
    accepted: Schema.Types.ObjectId[];
    rejected: Schema.Types.ObjectId[];
    block: Schema.Types.ObjectId[];
    socketId?: string;
    isOnline: boolean;
    status: Status;
    image?: string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        rating: { type: Number, default: 0, min: 0 },
        email: { type: String, unique: true, required: true, lowercase: true },
        accepted: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
        rejected: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
        block: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
        pending: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
        password: { type: String, required: true, select: false },
        socketId: { type: String, default: null },
        isOnline: { type: Boolean, default: false },
        status: { type: String, enum: Object.values(Status), default: Status.LOBBY },
        image: { type: String, default: null },
    },
    { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
