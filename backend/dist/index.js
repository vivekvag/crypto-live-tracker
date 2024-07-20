"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const stocksctrl_1 = require("./controller/stocksctrl");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// import https from "https";
const socketIo = require('socket.io');
const database_1 = require("./config/database");
const stocksrouter_1 = __importDefault(require("./router/stocksrouter"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// const server = https.createServer(app);
const io = socketIo(server);
exports.io = io;
// const wss : WebSocket.Server = new WebSocket.Server({server});
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api/stocks", stocksrouter_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDataBase)();
    io.on('connection', (socket) => {
        console.log('Client connected to Socket.IO');
        socket.on('disconnect', () => {
            console.log('Client disconnected from Socket.IO');
        });
    });
    console.log(`Server is running at ${PORT}`);
    node_cron_1.default.schedule('*/3 * * * * *', stocksctrl_1.fetchStocksData);
    node_cron_1.default.schedule('*/3 * * * *', stocksctrl_1.deleteTheData);
}));
