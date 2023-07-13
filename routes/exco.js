/*
Logic for EXCO Routes
*/

import express from "express";
import {
  createEXCO,
  getEXCOs,
  getEXCO,
  getEXCOEPFs,
  updateEXCO,
  deleteEXCO,
} from "../models/exco_db.js";
const router = express.Router();

router.post("/createEXCO", async (req, res) => {
  const data = req.body;
  try {
    await createEXCO(data["name"], data["email"]);
    res.status(201).send("Created EXCO user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/getEXCOs", async (req, res) => {
  try {
    const result = await getEXCOs();
    res.status(200).send(result);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send(`Server error: ${err}`);
  }
});

router.get("/getEXCO", async (req, res) => {
  const data = req.body;
  try {
    const result = await getEXCO(data["user_id"]);

    if (!result) {
      return res.status(404).send("EXCO not found");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/getEXCOEPFs", async (req, res) => {
  try {
    const data = req.body;
    const result = await getEXCOEPFs(data["exco_user_id"]);
    if (result.length === 0) {
      res.status(404).send("No EPFs found for the given EXCO user");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/updateEXCO", async (req, res) => {
  try {
    const data = req.body;
    const updatedEXCO = await updateEXCO(
      data["user_id"],
      data["name"],
      data["email"]
    );
    res.status(200).send("Updated EXCO user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteEXCO", async (req, res) => {
  try {
    const data = req.body;
    const deletedEXCO = await deleteEXCO(data["user_id"]);
    if (deletedEXCO.rowCount > 0) {
      res.status(200).send("Deleted EXCO user");
    } else {
      res.status(404).send("EXCO user not found or could not delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
