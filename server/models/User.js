const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    privyId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    protocol: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
    },
    walletId: { type: String },
    walletSetId: { type: String },
    walletAddress: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);