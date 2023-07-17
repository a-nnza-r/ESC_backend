/*
Logic for OSL Routes
*/

import express from "express";
import {
  createOSL,
  getOSLs,
  getOSL,
  updateOSL,
  deleteOSL,
} from "../models/osl_db.js";
const router = express.Router();

router.post("/createOSL", async (req, res) => {
  const data = req.body;
  try {
    await createOSL(data["name"], data["email"]);
    res.status(201).send("Created OSL user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/getOSLs", async (req, res) => {
  try {
    const result = await getOSLs();
    res.status(200).send(result);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send(`Server error: ${err}`);
  }
});

router.get("/getOSL", async (req, res) => {
  const data = req.query;
  try {
    const result = await getOSL(data.user_id);

    if (result.length===0) {
      return res.status(404).send("OSL not found");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/updateOSL", async (req, res) => {
  try {
    const data = req.body;
    const updatedOSL = await updateOSL(
      data["user_id"],
      data["name"],
      data["email"]
    );
    res.status(200).send("Updated OSL user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteOSL", async (req, res) => {
  try {
    const data = req.body;
    const deletedOSL = await deleteOSL(data["user_id"]);
    if (deletedOSL.rowCount > 0) {
      res.status(200).send("Deleted OSL user");
    } else {
      res.status(404).send("OSL user not found or could not delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
