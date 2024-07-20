"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stocksctrl_1 = require("../controller/stocksctrl");
const router = express_1.default.Router();
router.get('/data/:symbol', stocksctrl_1.getLatestData);
exports.default = router;
