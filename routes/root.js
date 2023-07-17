/*
Logic for ROOT Routes
*/

import express from "express";
import {
  createROOT,
  getROOTs,
  getROOT,
  updateROOT,
  deleteROOT,
} from "../models/root_db.js";
const router = express.Router();

router.post("/createROOT", async (req, res) => {
  const data = req.body;
  try {
    await createROOT(data["name"], data["email"]);
    res.status(201).send("Created ROOT user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/getROOTs", async (req, res) => {
  try {
    const result = await getROOTs();
    res.status(200).send(result);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send(`Server error: ${err}`);
  }
});

router.get("/getROOT", async (req, res) => {
  const data = req.query;
  try {
    const result = await getROOT(data.user_id);

    if (result.length===0) {
      return res.status(404).send("ROOT not found");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/updateROOT", async (req, res) => {
  try {
    const data = req.body;
    const updatedROOT = await updateROOT(
      data["user_id"],
      data["name"],
      data["email"]
    );
    res.status(200).send("Updated ROOT user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteROOT", async (req, res) => {
  try {
    const data = req.body;
    const deletedROOT = await deleteROOT(data["user_id"]);
    if (deletedROOT.rowCount > 0) {
      res.status(200).send("Deleted ROOT user");
    } else {
      res.status(404).send("ROOT user not found or could not delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
