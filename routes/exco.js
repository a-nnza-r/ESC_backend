/*
Logic for EXCO Routes
*/

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import {
  createEXCO,
  getEXCOs,
  getEXCO,
  getEXCOEPFs,
  updateEXCO,
  deleteEXCO,
  getEXCOsByAttribute,
} from "../models/exco_db.js";
const router = express.Router();

router.post("/createEXCO", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await createEXCO(data["name"], data["email"]); // newUser will contain the JSON object returned by createEXCO()
    res.status(201).send("Created EXCO user");
  } catch (err) {
    if (err.message === "Duplicate entry") {
      res.status(400).send("Duplicate entry");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
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
  const data = req.query;
  try {
    const result = await getEXCO(data.user_id);
    if (result.length === 0) {
      res.status(404).send("EXCO not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    if (err.message === "EXCO not found") {
      res.status(404).send("EXCO not found");
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/getEXCOEPFs", async (req, res) => {
  try {
    const data = req.query;
    const result = await getEXCOEPFs(data.exco_user_id);
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
    await updateEXCO(data["user_id"], data["name"], data["email"]);
    res.status(200).send("Updated EXCO user");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server Error : ${err.message}`);
  }
});

router.delete("/deleteEXCO", async (req, res) => {
  try {
    const data = req.query;
    const user_id = parseInt(data.user_id, 10); // Make sure user_id is interpreted as a number
    const deletedEXCO = await deleteEXCO(user_id); // Deleted user details are in `deletedEXCO`
    res.status(200).send("Deleted EXCO user");
  } catch (err) {
    if (err.message === "EXCO user has already been delete") {
      res.status(404).send(err.message);
    } else if (err.message === "EXCO user does not exist") {
      res.status(404).send(err.message);
    } else if (err.message === "User ID must be a positive integer") {
      res.status(400).send(err.message);
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
});

// this End point is essentially does the task of an get request
// however since the query for specific type of user can be rather complicated
// we use a post request that enables the use of JSON body data to be passed as part
// of the request.
router.post("/getEXCOsByAttribute", async (req, res) => {
  const data = req.body;
  try {
    const result = await getEXCOsByAttribute(data);
    if (!result) {
      return res.status(404).send("EXCO with such attributes does not exist");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
