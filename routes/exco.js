/*
Logic for EXCO Routes
*/

import express from 'express'
import {createEXCO, getEXCOs, getEXCO, getEXCOEPFs, updateEXCO, deleteEXCO} from '../models/exco_db.js'
const router = express.Router()

router.post("/createEXCO", async (req,res)=>{
    const data = req.body;
    await createEXCO(data["name"], data["email"])
    res.send("Created EXCO user")
})

router.get("/getEXCOs", async (req,res)=>{
    const result = await getEXCOs()
    res.send(result)
})

router.get("/getEXCO", async (req,res)=>{
    const data = req.body
    const result = await getEXCO(data["user_id"])
    res.send(result)
})

router.get("/getEXCOEPFs", async (req,res)=>{
    const data = req.body
    const result = await getEXCOEPFs(data["user_id"])
    res.send(result)
})

router.put("/updateEXCO", async (req,res)=>{
    const data = req.body
    await updateEXCO(data["user_id"], data["name"], data["email"])
    res.send("Updated EXCO user")
})

router.delete("/deleteEXCO", async (req,res)=>{
    const data = req.body
    await deleteEXCO(data["user_id"])
    res.send("Deleted EXCO user")
})

export default router


