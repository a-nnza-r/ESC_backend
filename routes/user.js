/*
Logic for EXCO Routes
*/

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import {
  createUser,
  getUser,
  getUsers,
  getEXCOEPFs,
  updateUser,
  deleteUser
} from "../models/user_db.js";
const router = express.Router();

router.post("/createUser", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await createUser(data["user_id"],data["name"], data["email"], data["type"]); // newUser will contain the JSON object returned by createEXCO()
    res.status(201).send(`Created User`);
  } catch (err) {
    if (err.message === "Duplicate entry") {
      res.status(400).send("Duplicate entry");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
});

router.get("/getUser", async (req, res) => {
  const data = req.query;
  try {
    const result = await getUser(data.user_id);
    if (result.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    if (err.message === "User not found") {
      res.status(404).send("User not found");
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const result = await getUsers();
    res.status(200).send(result);
  } catch (err) {
    console.error("Server error: ", err);
    res.status(500).send(`Server error: ${err}`);
  }
});


router.get("/getEXCOEPFs", async (req, res) => {
  try {
    const data = req.query;
    const result = await getEXCOEPFs(data.user_id);
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

router.put("/updateUser", async (req, res) => {
  try {
    const data = req.body;
    await updateUser(data["user_id"], data["name"], data["email"], data["type"]);
    res.status(200).send(`Updated User`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server Error : ${err.message}`);
  }
});

router.delete("/deleteUser", async (req, res) => {
  try {
    const data = req.query;
    const user_id = data.user_id; 
    const deletedUser= await deleteUser(user_id); // Deleted user details are in `deletedEXCO`
    res.status(200).send("Deleted User");
  } catch (err) {
    if (err.message === "User has already been deleted") {
      res.status(404).send(err.message);
    } else if (err.message === "User does not exist") {
      res.status(404).send(err.message);
    } else if (err.message === "User ID must be a positive integer") {
      res.status(400).send(err.message);
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
});

export default router;
