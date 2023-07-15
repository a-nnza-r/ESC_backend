/*
Logic for EXCO Routes
*/

import express from "express";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import { uploadFiles, getFiles } from "../models/files_db.js";
const router = express.Router();
import pg from "pg";
const { Pool } = pg;
const credentials = {
  host: "127.0.0.1",
  user: "postgres",
  port: 5432,
  password: "123",
  database: "esc_db",
};

router.post("/uploadFiles", upload.array("Files", 3), async (req, res) => {
  const files = req.files;
  const epf_id = req.body.epf_id;
  await uploadFiles(epf_id, files);
  res.send("Uploaded File");
});

router.get("/getFiles", async (req, res) => {
  const data = req.body;
  await getFiles(data["epf_id"]);
  res.send("Downloaded File");
});

export default router;
