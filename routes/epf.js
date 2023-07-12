/*
Logic for EPF Routes
*/

import express from 'express'
import {count_outstanding_EPF, createEPF, getEPF, getEPFs, updateEPF, deleteEPF} from '../models/epf_db.js'
const router = express.Router()

router.post("/createEPF", async (req,res)=>{
    const data = req.body;
    await createEPF(
        data["status"], data["exco_user_id"],
        data["A_name"], data["A_student_id"], data["A_organisation"], data["A_contact_number"], data["A_email"], data["A_comments_OSL"], data["A_comments_ROOT"],
        data["B_event_name"], data["B_target_audience"], data["B_event_schedule"], data["B_expected_turnout"], data["B_event_objective"], data["B_comments_OSL"], data["B_comments_ROOT"],
        data["C1_date"], data["C1_time"], data["C1_activity_and_description"], data["C1_venue"],
        data["C2_date"], data["C2_time"], data["C2_activity_and_description"], data["C2_venue"],
        data["C3_date"], data["C3_time"], data["C3_activity_and_description"], data["C3_venue"],
        data["C3_cleanup_date"], data["C3_cleanup_time"], data["C3_cleanup_activity_and_description"], data["C3_cleanup_venue"], data["C_comments_OSL"], data["C_comments_ROOT"],
        data["D1A_club_income_fund"], data["D1A_osl_seed_fund"], data["D1A_donation"], data["D1B_revenue"], data["D1B_donation_or_scholarship"], data["D1B_total_source_of_funds"],
        data["D11_items_goods_services"], data["D11_price"], data["D11_quantity"], data["D11_amount"], data["D11_total_revenue"], 
        data["D2_items"], data["D2_reason_for_purchase"], data["D2_venue"], data["D2_total_expenditure"], data["D_comments_OSL"], data["D_comments_ROOT"],
        data["E_personal_data"], data["E_comments_OSL"], data["E_comments_ROOT"],
        data["F_name"], data["F_student_id"], data["F_position"], data["F_comments_OSL"], data["F_comments_ROOT"],
        data["G_1_1"], data["G_1_2"], data["G_1_3"],
        data["G_2_1"], data["G_2_2"], data["G_2_3"],
        data["G_3_1"], data["G_3_2"], data["G_3_3"],
        data["G_4_1"], data["G_4_2"], data["G_4_3"],
        data["G_5_1"], data["G_5_2"], data["G_5_3"],
        data["G_6_1"], data["G_6_2"], data["G_6_3"],
        data["G_7_1"], data["G_7_2"], data["G_7_3"], data["G_comments_OSL"], data["G_comments_ROOT"]
    )   

    const outstanding_EPF_count = await count_outstanding_EPF()
    res.send(`Created EPF, Outstanding EPF Count: ${outstanding_EPF_count}`)
})

router.get("/getEPF", async (req,res)=>{
    const data = req.body
    const result = await getEPF(data["epf_id"])
    res.send(result)
})

router.get("/getEPFs", async (req,res)=>{
    const data = req.body
    const result = await getEPFs()
    res.send(result)
})



router.put("/updateEPF", async (req,res)=>{
    const data = req.body
    await updateEPF(
        data["epf_id"], data["status"], data["exco_user_id"],
        data["A_name"], data["A_student_id"], data["A_organisation"], data["A_contact_number"], data["A_email"], data["A_comments_OSL"], data["A_comments_ROOT"],
        data["B_event_name"], data["B_target_audience"], data["B_event_schedule"], data["B_expected_turnout"], data["B_event_objective"], data["B_comments_OSL"], data["B_comments_ROOT"],
        data["C1_date"], data["C1_time"], data["C1_activity_and_description"], data["C1_venue"],
        data["C2_date"], data["C2_time"], data["C2_activity_and_description"], data["C2_venue"],
        data["C3_date"], data["C3_time"], data["C3_activity_and_description"], data["C3_venue"],
        data["C3_cleanup_date"], data["C3_cleanup_time"], data["C3_cleanup_activity_and_description"], data["C3_cleanup_venue"], data["C_comments_OSL"], data["C_comments_ROOT"],
        data["D1A_club_income_fund"], data["D1A_osl_seed_fund"], data["D1A_donation"], data["D1B_revenue"], data["D1B_donation_or_scholarship"], data["D1B_total_source_of_funds"],
        data["D11_items_goods_services"], data["D11_price"], data["D11_quantity"], data["D11_amount"], data["D11_total_revenue"], 
        data["D2_items"], data["D2_reason_for_purchase"], data["D2_venue"], data["D2_total_expenditure"], data["D_comments_OSL"], data["D_comments_ROOT"],
        data["E_personal_data"], data["E_comments_OSL"], data["E_comments_ROOT"],
        data["F_name"], data["F_student_id"], data["F_position"], data["F_comments_OSL"], data["F_comments_ROOT"],
        data["G_1_1"], data["G_1_2"], data["G_1_3"],
        data["G_2_1"], data["G_2_2"], data["G_2_3"],
        data["G_3_1"], data["G_3_2"], data["G_3_3"],
        data["G_4_1"], data["G_4_2"], data["G_4_3"],
        data["G_5_1"], data["G_5_2"], data["G_5_3"],
        data["G_6_1"], data["G_6_2"], data["G_6_3"],
        data["G_7_1"], data["G_7_2"], data["G_7_3"], data["G_comments_OSL"], data["G_comments_ROOT"]

    )
    res.send("Updated EPF")
})

router.delete("/deleteEPF", async (req,res)=>{
    const data = req.body
    await deleteEPF(data["epf_id"])
    res.send("Deleted EPF")
})

export default router