import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import getDownloadedSongs from "../middlewares/getSongs.js";

const router = express.Router();

router.get("/get-downloaded-songs", protectRoute, getDownloadedSongs);

export default router;
