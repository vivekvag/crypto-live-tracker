'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.fetchStocksData = fetchStocksData;
exports.deleteTheData = deleteTheData;
exports.getLatestData = getLatestData;
const Stock_1 = __importDefault(require('../models/Stock'));
const axios_1 = __importDefault(require('axios'));
const dotenv_1 = __importDefault(require('dotenv'));
const __1 = require('..');
dotenv_1.default.config();
let activeSymbol = 'bitcoin';
const apiKeys = [
  {
    key: process.env.API_KEY_1,
    startHour: 0,
    endHour: 6
  },
  {
    key: process.env.API_KEY_2,
    startHour: 6,
    endHour: 12
  },
  {
    key: process.env.API_KEY_3,
    startHour: 12,
    endHour: 18
  },
  {
    key: process.env.API_KEY_4,
    startHour: 18,
    endHour: 24
  }
];
function getCurrentApiKey() {
  const now = new Date(); //current time
  const currentHour = now.getHours(); // will give hours in a digit
  console.log(new Date().getHours());
  const currentApiKey = apiKeys.find(
    (item) => currentHour >= item.startHour && currentHour < item.endHour
  );
  if (currentApiKey) {
    return currentApiKey.key;
  } else {
    console.log('No Api Key found');
    return null;
  }
}
function fetchStocksData() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const api_key = getCurrentApiKey();
      // console.log(api_key);
      const response = yield axios_1.default.post(
        'https://api.livecoinwatch.com/coins/list',
        {
          currency: 'USD',
          sort: 'rank',
          order: 'ascending',
          offset: 0,
          limit: 5,
          meta: true
        },
        {
          headers: {
            'x-api-key': `${api_key}`
          }
        }
      );
      const stocksData = response.data;
      let newData = yield Stock_1.default.insertMany(
        stocksData.map((stock) => ({
          symbol: stock.name.toLowerCase(),
          price: stock.rate
        }))
      );
      // newData = newData.filter((item)=> item.symbol === activeSymbol)
      // const updatedData = await Stock.find({symbol: activeSymbol}).sort({timestamp : -1}).limit(20);
      console.log(activeSymbol);
      __1.io.emit('UPDATE_DATA', { type: 'UPDATE_DATA', data: newData });
      //notifying the client that data as updated
      // wss.clients.forEach(client => {
      //     client.send(JSON.stringify({type: 'UPDATE_DATA', data: updatedData}))
      // })
      console.log('data fetched and successfully stored');
      //for clearing purpose
      // await Stock.deleteMany()
    } catch (error) {
      console.log(error);
    }
  });
}
function deleteTheData() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const now = new Date();
      const deleteBefore = new Date(now.getTime() - 3 * 60000);
      yield Stock_1.default.deleteMany({ createdAt: { $lt: deleteBefore } });
      console.log('all data has been deleted');
    } catch (error) {
      console.error('error in deleting the data', error);
    }
  });
}
function getLatestData(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { symbol } = req.params;
      console.log(req.params);
      activeSymbol = symbol;
      console.log(symbol);
      const data = yield Stock_1.default.find({ symbol }).sort({ timestamp: -1 }).limit(21);
      res.status(200).json(data);
    } catch (error) {
      console.error('unable to fetch the data : error ', error);
    }
  });
}
