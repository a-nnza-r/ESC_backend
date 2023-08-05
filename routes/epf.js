/*
Logic for EPF Routes
*/

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import {
  update_outstanding_EPF_count,
  createEPF,
  getEPF,
  getEPFs,
  updateEPF,
  deleteEPF,
} from "../models/epf_db.js";
import {
  validateJSON_createEPF,
  validateJSON_updateEPF,
  validateParam_getEPF,
  validateParam_deleteEPF,
} from "../middleware/validationMiddleware_EPF.js";
const router = express.Router();

router.post("/createEPF", validateJSON_createEPF, async (req, res) => {
  const data = req.body;

  try {
    const { created_EPF, epf_count } = await createEPF(
      data["status"],
      data["exco_user_id"],
      data["a_name"],
      data["a_student_id"],
      data["a_organisation"],
      data["a_contact_number"],
      data["a_email"],
      data["a_comments_osl"],
      data["a_comments_root"],
      data["b_event_name"],
      data["b_target_audience"],
      data["b_event_schedule"],
      data["b_expected_turnout"],
      data["b_event_objective"],
      data["b_comments_osl"],
      data["b_comments_root"],
      data["c1_date"],
      data["c1_time"],
      data["c1_activity_and_description"],
      data["c1_venue"],
      data["c2_date"],
      data["c2_time"],
      data["c2_activity_and_description"],
      data["c2_venue"],
      data["c3_date"],
      data["c3_time"],
      data["c3_activity_and_description"],
      data["c3_venue"],
      data["c3_cleanup_date"],
      data["c3_cleanup_time"],
      data["c3_cleanup_activity_and_description"],
      data["c3_cleanup_venue"],
      data["c_comments_osl"],
      data["c_comments_root"],
      data["d1a_club_income_fund"],
      data["d1a_osl_seed_fund"],
      data["d1a_donation"],
      data["d1b_revenue"],
      data["d1b_donation_or_scholarship"],
      data["d1b_total_source_of_funds"],
      data["d11_items_goods_services"],
      data["d11_price"],
      data["d11_quantity"],
      data["d11_amount"],
      data["d11_total_revenue"],
      data["d2_items"],
      data["d2_reason_for_purchase"],
      data["d2_venue"],
      data["d2_total_expenditure"],
      data["d_comments_osl"],
      data["d_comments_root"],
      data["e_personal_data"],
      data["e_comments_osl"],
      data["e_comments_root"],
      data["f_name"],
      data["f_student_id"],
      data["f_position"],
      data["f_comments_osl"],
      data["f_comments_root"],
      data["g_1_1"],
      data["g_1_2"],
      data["g_1_3"],
      data["g_2_1"],
      data["g_2_2"],
      data["g_2_3"],
      data["g_3_1"],
      data["g_3_2"],
      data["g_3_3"],
      data["g_4_1"],
      data["g_4_2"],
      data["g_4_3"],
      data["g_5_1"],
      data["g_5_2"],
      data["g_5_3"],
      data["g_6_1"],
      data["g_6_2"],
      data["g_6_3"],
      data["g_7_1"],
      data["g_7_2"],
      data["g_7_3"],
      data["g_comments_osl"],
      data["g_comments_root"]
    );

    res
      .status(201)
      .send(`Created EPF. Current user has ${epf_count} EPFs outstanding`);
  } catch (err) {
    console.log("Failed to create EPF.", err);
    res.status(500).send("Failed to create EPF.");
  }
});

router.get("/getEPF", validateParam_getEPF, async (req, res) => {
  try {
    const data = req.query;
    const result = await getEPF(parseInt(data.epf_id));
    if (result === null) {
      res.status(404).send("No EPFs found for the given EPF id");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/getEPFs", async (req, res) => {
  try {
    const result = await getEPFs();
    if (result === null) {
      res.status(404).send("No EPFs found !");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/updateEPF", validateJSON_updateEPF, async (req, res) => {
  const data = req.body;
  try {
    const updateCheck = await updateEPF(
      data["epf_id"],
      data["status"],
      data["exco_user_id"],
      data["a_name"],
      data["a_student_id"],
      data["a_organisation"],
      data["a_contact_number"],
      data["a_email"],
      data["a_comments_osl"],
      data["a_comments_root"],
      data["b_event_name"],
      data["b_target_audience"],
      data["b_event_schedule"],
      data["b_expected_turnout"],
      data["b_event_objective"],
      data["b_comments_osl"],
      data["b_comments_root"],
      data["c1_date"],
      data["c1_time"],
      data["c1_activity_and_description"],
      data["c1_venue"],
      data["c2_date"],
      data["c2_time"],
      data["c2_activity_and_description"],
      data["c2_venue"],
      data["c3_date"],
      data["c3_time"],
      data["c3_activity_and_description"],
      data["c3_venue"],
      data["c3_cleanup_date"],
      data["c3_cleanup_time"],
      data["c3_cleanup_activity_and_description"],
      data["c3_cleanup_venue"],
      data["c_comments_osl"],
      data["c_comments_root"],
      data["d1a_club_income_fund"],
      data["d1a_osl_seed_fund"],
      data["d1a_donation"],
      data["d1b_revenue"],
      data["d1b_donation_or_scholarship"],
      data["d1b_total_source_of_funds"],
      data["d11_items_goods_services"],
      data["d11_price"],
      data["d11_quantity"],
      data["d11_amount"],
      data["d11_total_revenue"],
      data["d2_items"],
      data["d2_reason_for_purchase"],
      data["d2_venue"],
      data["d2_total_expenditure"],
      data["d_comments_osl"],
      data["d_comments_root"],
      data["e_personal_data"],
      data["e_comments_osl"],
      data["e_comments_root"],
      data["f_name"],
      data["f_student_id"],
      data["f_position"],
      data["f_comments_osl"],
      data["f_comments_root"],
      data["g_1_1"],
      data["g_1_2"],
      data["g_1_3"],
      data["g_2_1"],
      data["g_2_2"],
      data["g_2_3"],
      data["g_3_1"],
      data["g_3_2"],
      data["g_3_3"],
      data["g_4_1"],
      data["g_4_2"],
      data["g_4_3"],
      data["g_5_1"],
      data["g_5_2"],
      data["g_5_3"],
      data["g_6_1"],
      data["g_6_2"],
      data["g_6_3"],
      data["g_7_1"],
      data["g_7_2"],
      data["g_7_3"],
      data["g_comments_osl"],
      data["g_comments_root"]
    );

    if (updateCheck["epf_id"] == data["epf_id"]) {
      res.status(200).send(`Updated EPF`);
    } else {
      res.status(400).send("EPF not found or could not update");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteEPF", validateParam_deleteEPF, async (req, res) => {
  const data = req.query;
  try {
    const deletedEPF = await deleteEPF(parseInt(data.epf_id));
    if (deletedEPF["epf_id"] == data.epf_id) {
      res.status(200).send(`Deleted EPF`);
    } else {
      res.status(404).send("EPF not found or could not delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
