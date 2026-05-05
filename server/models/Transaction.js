const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    privyId: {
        type: String,
    },
    walletId: {
        type: String,
    },
    address: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0
    },
    chain: {
        type: String,
    },
    tokenId: {
        type: String,
    },
    transactionType: {
        type: String,
    },

    txHash: {
        type: String,
        default: null
    }
}, { timestamps: true });


module.exports = mongoose.model("Transaction", transactionSchema);