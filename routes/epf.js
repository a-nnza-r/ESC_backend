/*
Logic for EPF Routes
*/

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import {
  count_outstanding_EPF,
  createEPF,
  getEPF,
  getEPFs,
  updateEPF,
  deleteEPF,
  getEPFbyAttrbute,
} from "../models/epf_db.js";
const router = express.Router();

router.post("/createEPF", async (req, res) => {
  const data = req.body;

  try {
    const epf_id = await createEPF(
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
    const outstanding_EPF_count = await count_outstanding_EPF();
    res
      .status(201)
      .send(`Created EPF, Outstanding EPF Count: ${outstanding_EPF_count}`);
  } catch (err) {
    console.log("Failed to create EPF.", err);
    res.status(500).send("Failed to create EPF.");
  }
});

router.get("/getEPF", async (req, res) => {
  try {
    const data = req.query;
    const result = await getEPF(data.epf_id);
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
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/updateEPF", async (req, res) => {
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

    if (updateCheck > 0) {
      const outstanding_EPF_count = await count_outstanding_EPF();
      res
        .status(200)
        .send(`Updated EPF, Outstanding EPF Count: ${outstanding_EPF_count}`);
    } else {
      res.status(400).send("EPF not found or could not update");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteEPF", async (req, res) => {
  const data = req.body;
  try {
    const deletedEPF = await deleteEPF(data["epf_id"]);
    if (deletedEPF > 0) {
      const outstanding_EPF_count = await count_outstanding_EPF();
      res
        .status(200)
        .send(`Deleted EPF, Outstanding EPF Count: ${outstanding_EPF_count}`);
    } else {
      res.status(404).send("EPF not found or could not delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// this End point is essentially does the task of an get request
// however since the query for specific type of user can be rather complicated
// we use a post request that enables the use of JSON body data to be passed as part
// of the request.
router.post("/getEPFbyAttribute", async (req, res) => {
  try {
    const data = req.body;
    const result = await getEPFbyAttrbute(data);
    if (result === null) {
      res.status(404).send("No EPFs found for the given attributes");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

export default router;
