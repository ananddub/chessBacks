import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TURN } from '@constant/channels';

export interface Move {
    from: string;
    to: string;
    piece: string;
}
export interface Movement {
    moves: Move;
    state: {
        in_check: boolean;
        in_checkmate: boolean;
        in_draw: boolean;
        in_stalemate: boolean;
        in_threefold_repetition: boolean;
        insufficient_material: boolean;
        game_over: boolean;
        fen: string;
        in_promotion: boolean;
    };
}
export interface IChess extends Document {
    player1: Schema.Types.ObjectId;
    player2: Schema.Types.ObjectId;
    groupId: string;
    isPrivate: boolean;
    createdAt: Date;
    accepted: Schema.Types.ObjectId[];
    pending: Schema.Types.ObjectId[];
    rejected: Schema.Types.ObjectId[];
    movement: Movement[];
    watching: { user: Schema.Types.ObjectId; isWatch: boolean }[];
    currentTurn: TURN;
    player2Peices: TURN;
    player1Peices: TURN;
    likes: Schema.Types.ObjectId[];
}

const ChessSchema: Schema = new Schema({
    groupId: { type: String, default: uuidv4() },
    groupName: { type: String, default: '' },
    player1: {
        turn: { type: String, enum: Object.values(TURN), default: TURN.WHITE },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    status: { type: String, default: 'pending' },
    requested: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    removed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    accepted: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    rejected: [{ type: Schema.Types.ObjectId, ref: 'User', expireAfterSeconds: 30 }],
    pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isPrivate: { type: Boolean, default: false },
    startTimer: { type: Number, default: () => Date.now() },
    p1starttime: { type: Number, default: () => Date.now() },
    p2starttime: { type: Number, default: () => Date.now() },
    p1endtime: { type: Number, default: () => Date.now() },
    p2endtime: { type: Number, default: () => Date.now() },
    message: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User' },

            message: { type: String, required: true },
            createdAt: { type: Number, default: () => Date.now() },
        },
    ],
    endTimer: {
        type: Number,
        default: function () {
            return this.startTimer + 300000;
        },
    },
    createdAt: { type: Date, default: Date.now },
    watching: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, isWatch: { type: Boolean, default: false } }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    movement: [
        {
            turn: { type: String, enum: Object.values(TURN), default: TURN.WHITE },
            moves: {
                from: { type: String, required: true },
                to: { type: String, required: true },
                piece: { type: String, required: true },
            },
            state: {
                in_check: { type: Boolean, required: true },
                in_checkmate: { type: Boolean, required: true },
                in_draw: { type: Boolean, required: true },
                in_stalemate: { type: Boolean, required: true },
                in_threefold_repetition: { type: Boolean, required: true },
                insufficient_material: { type: Boolean, required: true },
                game_over: { type: Boolean, required: true },
                fen: { type: String, required: true },
                in_promotion: { type: Boolean, required: true },
            },
        },
    ],
    currentTurn: { type: String, enum: Object.values(TURN), default: TURN.WHITE },
    player2Peices: { type: String, enum: Object.values(TURN), default: TURN.BLACK },
    player2: {
        turn: { type: String, enum: Object.values(TURN), default: TURN.BLACK },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            validate: {
                validator: function (value) {
                    return this.player1 !== value;
                },
                message: 'Players must be different',
            },
        },
    },
});
ChessSchema.plugin(mongoosePaginate);
export const Chess = mongoose.model<IChess>('Chess', ChessSchema);
