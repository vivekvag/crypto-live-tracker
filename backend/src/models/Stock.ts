import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true
})

const Stock = mongoose.model('StockPrices',StockSchema)

export default Stock;