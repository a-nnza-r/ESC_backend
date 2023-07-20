/*
Logic for EXCO Routes
*/

import express from "express";
import cors from 'cors';
const app = express()
app.use(cors())
app.use(express.json())
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import { uploadFiles, getFiles, deleteFiles } from "../models/files_db.js";
const router = express.Router();

router.post("/uploadFiles", upload.array("Files", 3), async (req, res) => {
  try {
    const files = req.files;
    const epf_id = req.body.epf_id;
    await uploadFiles(epf_id, files);
    res.status(200).send("Uploaded File"); // 200 signifies successful HTTP request
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error"); // 500 is a general server error
  }
});

router.get("/getFiles", async (req, res) => {
  try {
    const data = req.query;
    const file_metadata = await getFiles(data.epf_id);
    res.status(200).send({ message: "Downloaded Files", files: file_metadata });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

router.delete("/deleteFiles", upload.array("Files", 3), async (req, res) => {
  try {
    const data = req.body;
    const file_ids = data["file_ids"];
    const deletedRowCount = await deleteFiles(file_ids);
    res.status(200).send({ message: `${deletedRowCount} File(s) Deleted` });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

export default router;
