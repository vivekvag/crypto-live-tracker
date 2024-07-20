import Stock from '../models/Stock'
import axios from 'axios'
import dotenv from "dotenv"
import { io } from '..';


dotenv.config();

let activeSymbol = 'bitcoin'

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
]

function getCurrentApiKey(){
    const now = new Date(); //current time
    const currentHour = now.getHours(); // will give hours in a digit
    console.log((new Date()).getHours());
    const currentApiKey = apiKeys.find(item => currentHour >= item.startHour && currentHour < item.endHour);

    if(currentApiKey){
        return currentApiKey.key;
    } else {
        console.log("No Api Key found")
        return null;
    }

}

export async function fetchStocksData(){
    try {
            const api_key = getCurrentApiKey();
            // console.log(api_key);
            const response = await axios.post('https://api.livecoinwatch.com/coins/list', {
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true
            }, {
                headers: {
                    'x-api-key': `${api_key}`
                }
            })
            const stocksData = response.data;
            

            let newData = await Stock.insertMany(stocksData.map((stock: any) => ({
                symbol: stock.name.toLowerCase(),
                price: stock.rate
            })))


            // newData = newData.filter((item)=> item.symbol === activeSymbol)
            // const updatedData = await Stock.find({symbol: activeSymbol}).sort({timestamp : -1}).limit(20);
            console.log(activeSymbol);
            io.emit('UPDATE_DATA', { type: 'UPDATE_DATA', data: newData });
       
            //notifying the client that data as updated
            // wss.clients.forEach(client => {
            //     client.send(JSON.stringify({type: 'UPDATE_DATA', data: updatedData}))
            // })
            console.log("data fetched and successfully stored");

            //for clearing purpose
            // await Stock.deleteMany()

    } catch (error) {
        console.log(error)
    }
};


export async function deleteTheData(){
    try {
        const now = new Date();
        const deleteBefore  = new Date(now.getTime() - (3 * 60000))
        await Stock.deleteMany({createdAt : {$lt : deleteBefore}});
        console.log("all data has been deleted")
    } catch (error) {
        console.error("error in deleting the data", error);
    }
}

export async function getLatestData(req : any, res: any){
    try {
        const {symbol} = req.params;
        console.log(req.params);
        activeSymbol = symbol;
        console.log(symbol);
        const data = await Stock.find({ symbol }).sort({timestamp : -1}).limit(21);
        res.status(200).json(data);
    } catch (error) {
        console.error("unable to fetch the data : error ", error);
    }
}