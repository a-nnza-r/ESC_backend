/*
Logic for Users Routes
*/

import express from 'express'
import {createUser, getUsers, getUser, getUserEPFs, updateUser, deleteUser} from '../models/user_db.js'
const router = express.Router()

router.post("/createUser", async (req,res)=>{
    const data = req.body;
    await createUser(data["name"], data["email"], data["password"])
    res.send("Created User")
})

router.get("/getUsers", async (req,res)=>{
    const result = await getUsers()
    res.send(result)
})

router.get("/getUser", async (req,res)=>{
    const data = req.body
    const result = await getUser(data["user_id"])
    res.send(result)
})

router.get("/getUserEPFs", async (req,res)=>{
    const data = req.body
    const result = await getUserEPFs(data["user_id"])
    res.send(result)
})

router.put("/updateUser", async (req,res)=>{
    const data = req.body
    await updateUser(data["user_id"], data["name"], data["email"], data["password"])
    res.send("Updated User")
})

router.delete("/deleteUser", async (req,res)=>{
    const data = req.body
    await deleteUser(data["user_id"])
    res.send("Deleted User")
})

export default router