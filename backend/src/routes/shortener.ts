import { Router, Request, Response } from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import Url from "../models/Url";

dotenv.config();
const router = Router();
const BASE_URL = process.env.BASE_URL;

router.post("/shorten", async (req: Request, res: Response): Promise<void> => {
  const { originalUrl } = req.body;

  if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
    res.status(400).json({ error: "Invalid or missing originalUrl" });
    return;
  }

  const shortId = nanoid(6);

  try {
    const newUrl = await Url.create({ shortId, originalUrl });
    res.status(201).json({
      shortUrl: `${BASE_URL}/${newUrl.shortId}`,
      originalUrl: newUrl.originalUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create short URL" });
  }
});

router.get("/:shortId", async (req: Request, res: Response): Promise<void> => {
  const { shortId } = req.params;

  try {
    const found = await Url.findOne({ shortId });

    if (!found) {
      res.status(404).json({ error: "Short URL not found" });
      return;
    }

    res.redirect(found.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Failed to redirect" });
  }
});

export default router;
