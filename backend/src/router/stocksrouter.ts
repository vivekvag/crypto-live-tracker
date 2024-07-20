import express from "express";
import { getLatestData } from "../controller/stocksctrl";


const router = express.Router();

router.get('/data/:symbol',getLatestData)

export default router;