'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const StockSchema = new mongoose_1.default.Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);
const Stock = mongoose_1.default.model('StockPrices', StockSchema);
exports.default = Stock;
