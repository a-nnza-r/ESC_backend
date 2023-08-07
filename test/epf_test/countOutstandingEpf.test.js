import { getEPF, update_outstanding_EPF_count } from "../../models/epf_db.js";
import { createUser } from "../../models/user_db.js";
import {
  test_pool,
  deleteFromUsers,
  deleteFromEPFs,
  createEPFrecord,
} from "./epf_test_utils";

import path from "path";
import fs from "fs";

describe("update outstanding EPF test", () => {
  beforeAll(async () => {
    await deleteFromUsers(test_pool);
    await createUser(
      "UPOUT1",
      "name 1",
      "name_1@mymail.sutd.edu.sg",
      "FRE",
      test_pool
    );
    await createUser(
      "UPOUT2",
      "name 2",
      "name_2@mymail.sutd.edu.sg",
      "FRE",
      test_pool
    );
    await createUser(
      "UPOUT3",
      "name 3",
      "name_3@mymail.sutd.edu.sg",
      "OSL",
      test_pool
    );
    await createUser(
      "UPOUT4",
      "name 4",
      "name_4@mymail.sutd.edu.sg",
      "OSL",
      test_pool
    );
    await createUser(
      "UPOUT5",
      "name 5",
      "name_5@mymail.sutd.edu.sg",
      "ROOT",
      test_pool
    );
    await createUser(
      "UPOUT6",
      "name 6",
      "name_6@mymail.sutd.edu.sg",
      "ROOT",
      test_pool
    );
  });

  test("Test ID: 1 - Insert 2 EPF record one with approved status and the other with pending", async () => {
    const jsonFilePath_1 = path.join(
      __dirname,
      "count_outstanding_EPF_testjson",
      "createEPF_test1_1.json"
    );
    const jsonData_1 = fs.readFileSync(jsonFilePath_1, "utf-8");
    const data_1 = JSON.parse(jsonData_1);

    const jsonFilePath_2 = path.join(
      __dirname,
      "count_outstanding_EPF_testjson",
      "createEPF_test1_2.json"
    );
    const jsonData_2 = fs.readFileSync(jsonFilePath_2, "utf-8");
    const data_2 = JSON.parse(jsonData_2);

    const {
      status_1,
      exco_user_id_1,
      a_name_1,
      a_student_id_1,
      a_organisation_1,
      a_contact_number_1,
      a_email_1,
      a_comments_osl_1,
      a_comments_root_1,
      b_event_name_1,
      b_target_audience_1,
      b_event_schedule_1,
      b_expected_turnout_1,
      b_event_objective_1,
      b_comments_osl_1,
      b_comments_root_1,
      c1_date_1,
      c1_time_1,
      c1_activity_and_description_1,
      c1_venue_1,
      c2_date_1,
      c2_time_1,
      c2_activity_and_description_1,
      c2_venue_1,
      c3_date_1,
      c3_time_1,
      c3_activity_and_description_1,
      c3_venue_1,
      c3_cleanup_date_1,
      c3_cleanup_time_1,
      c3_cleanup_activity_and_description_1,
      c3_cleanup_venue_1,
      c_comments_osl_1,
      c_comments_root_1,
      d1a_club_income_fund_1,
      d1a_osl_seed_fund_1,
      d1a_donation_1,
      d1b_revenue_1,
      d1b_donation_or_scholarship_1,
      d1b_total_source_of_funds_1,
      d11_items_goods_services_1,
      d11_price_1,
      d11_quantity_1,
      d11_amount_1,
      d11_total_revenue_1,
      d2_items_1,
      d2_reason_for_purchase_1,
      d2_venue_1,
      d2_total_expenditure_1,
      d_comments_osl_1,
      d_comments_root_1,
      e_personal_data_1,
      e_comments_osl_1,
      e_comments_root_1,
      f_name_1,
      f_student_id_1,
      f_position_1,
      f_comments_osl_1,
      f_comments_root_1,
      g_1_1_1,
      g_1_2_1,
      g_1_3_1,
      g_2_1_1,
      g_2_2_1,
      g_2_3_1,
      g_3_1_1,
      g_3_2_1,
      g_3_3_1,
      g_4_1_1,
      g_4_2_1,
      g_4_3_1,
      g_5_1_1,
      g_5_2_1,
      g_5_3_1,
      g_6_1_1,
      g_6_2_1,
      g_6_3_1,
      g_7_1_1,
      g_7_2_1,
      g_7_3_1,
      g_comments_osl_1,
      g_comments_root_1,
    } = data_1;

    const {
      status_2,
      exco_user_id_2,
      a_name_2,
      a_student_id_2,
      a_organisation_2,
      a_contact_number_2,
      a_email_2,
      a_comments_osl_2,
      a_comments_root_2,
      b_event_name_2,
      b_target_audience_2,
      b_event_schedule_2,
      b_expected_turnout_2,
      b_event_objective_2,
      b_comments_osl_2,
      b_comments_root_2,
      c1_date_2,
      c1_time_2,
      c1_activity_and_description_2,
      c1_venue_2,
      c2_date_2,
      c2_time_2,
      c2_activity_and_description_2,
      c2_venue_2,
      c3_date_2,
      c3_time_2,
      c3_activity_and_description_2,
      c3_venue_2,
      c3_cleanup_date_2,
      c3_cleanup_time_2,
      c3_cleanup_activity_and_description_2,
      c3_cleanup_venue_2,
      c_comments_osl_2,
      c_comments_root_2,
      d1a_club_income_fund_2,
      d1a_osl_seed_fund_2,
      d1a_donation_2,
      d1b_revenue_2,
      d1b_donation_or_scholarship_2,
      d1b_total_source_of_funds_2,
      d11_items_goods_services_2,
      d11_price_2,
      d11_quantity_2,
      d11_amount_2,
      d11_total_revenue_2,
      d2_items_2,
      d2_reason_for_purchase_2,
      d2_venue_2,
      d2_total_expenditure_2,
      d_comments_osl_2,
      d_comments_root_2,
      e_personal_data_2,
      e_comments_osl_2,
      e_comments_root_2,
      f_name_2,
      f_student_id_2,
      f_position_2,
      f_comments_osl_2,
      f_comments_root_2,
      g_1_1_2,
      g_1_2_2,
      g_1_3_2,
      g_2_1_2,
      g_2_2_2,
      g_2_3_2,
      g_3_1_2,
      g_3_2_2,
      g_3_3_2,
      g_4_1_2,
      g_4_2_2,
      g_4_3_2,
      g_5_1_2,
      g_5_2_2,
      g_5_3_2,
      g_6_1_2,
      g_6_2_2,
      g_6_3_2,
      g_7_1_2,
      g_7_2_2,
      g_7_3_2,
      g_comments_osl_2,
      g_comments_root_2,
    } = data_2;

    let result_EXCO_1;
    let result_EXCO_2;
    let result_OSL;
    let result_ROOT;
    let client;

    try {
      const client = await test_pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      await Promise.all([
        createEPFrecord(
          status_1,
          exco_user_id_1,
          a_name_1,
          a_student_id_1,
          a_organisation_1,
          a_contact_number_1,
          a_email_1,
          a_comments_osl_1,
          a_comments_root_1,
          b_event_name_1,
          b_target_audience_1,
          b_event_schedule_1,
          b_expected_turnout_1,
          b_event_objective_1,
          b_comments_osl_1,
          b_comments_root_1,
          c1_date_1,
          c1_time_1,
          c1_activity_and_description_1,
          c1_venue_1,
          c2_date_1,
          c2_time_1,
          c2_activity_and_description_1,
          c2_venue_1,
          c3_date_1,
          c3_time_1,
          c3_activity_and_description_1,
          c3_venue_1,
          c3_cleanup_date_1,
          c3_cleanup_time_1,
          c3_cleanup_activity_and_description_1,
          c3_cleanup_venue_1,
          c_comments_osl_1,
          c_comments_root_1,
          d1a_club_income_fund_1,
          d1a_osl_seed_fund_1,
          d1a_donation_1,
          d1b_revenue_1,
          d1b_donation_or_scholarship_1,
          d1b_total_source_of_funds_1,
          d11_items_goods_services_1,
          d11_price_1,
          d11_quantity_1,
          d11_amount_1,
          d11_total_revenue_1,
          d2_items_1,
          d2_reason_for_purchase_1,
          d2_venue_1,
          d2_total_expenditure_1,
          d_comments_osl_1,
          d_comments_root_1,
          e_personal_data_1,
          e_comments_osl_1,
          e_comments_root_1,
          f_name_1,
          f_student_id_1,
          f_position_1,
          f_comments_osl_1,
          f_comments_root_1,
          g_1_1_1,
          g_1_2_1,
          g_1_3_1,
          g_2_1_1,
          g_2_2_1,
          g_2_3_1,
          g_3_1_1,
          g_3_2_1,
          g_3_3_1,
          g_4_1_1,
          g_4_2_1,
          g_4_3_1,
          g_5_1_1,
          g_5_2_1,
          g_5_3_1,
          g_6_1_1,
          g_6_2_1,
          g_6_3_1,
          g_7_1_1,
          g_7_2_1,
          g_7_3_1,
          g_comments_osl_1,
          g_comments_root_1,
          client
        ),

        createEPFrecord(
          status_2,
          exco_user_id_2,
          a_name_2,
          a_student_id_2,
          a_organisation_2,
          a_contact_number_2,
          a_email_2,
          a_comments_osl_2,
          a_comments_root_2,
          b_event_name_2,
          b_target_audience_2,
          b_event_schedule_2,
          b_expected_turnout_2,
          b_event_objective_2,
          b_comments_osl_2,
          b_comments_root_2,
          c1_date_2,
          c1_time_2,
          c1_activity_and_description_2,
          c1_venue_2,
          c2_date_2,
          c2_time_2,
          c2_activity_and_description_2,
          c2_venue_2,
          c3_date_2,
          c3_time_2,
          c3_activity_and_description_2,
          c3_venue_2,
          c3_cleanup_date_2,
          c3_cleanup_time_2,
          c3_cleanup_activity_and_description_2,
          c3_cleanup_venue_2,
          c_comments_osl_2,
          c_comments_root_2,
          d1a_club_income_fund_2,
          d1a_osl_seed_fund_2,
          d1a_donation_2,
          d1b_revenue_2,
          d1b_donation_or_scholarship_2,
          d1b_total_source_of_funds_2,
          d11_items_goods_services_2,
          d11_price_2,
          d11_quantity_2,
          d11_amount_2,
          d11_total_revenue_2,
          d2_items_2,
          d2_reason_for_purchase_2,
          d2_venue_2,
          d2_total_expenditure_2,
          d_comments_osl_2,
          d_comments_root_2,
          e_personal_data_2,
          e_comments_osl_2,
          e_comments_root_2,
          f_name_2,
          f_student_id_2,
          f_position_2,
          f_comments_osl_2,
          f_comments_root_2,
          g_1_1_2,
          g_1_2_2,
          g_1_3_2,
          g_2_1_2,
          g_2_2_2,
          g_2_3_2,
          g_3_1_2,
          g_3_2_2,
          g_3_3_2,
          g_4_1_2,
          g_4_2_2,
          g_4_3_2,
          g_5_1_2,
          g_5_2_2,
          g_5_3_2,
          g_6_1_2,
          g_6_2_2,
          g_6_3_2,
          g_7_1_2,
          g_7_2_2,
          g_7_3_2,
          g_comments_osl_2,
          g_comments_root_2,
          client
        ),
      ]);
      await update_outstanding_EPF_count(client);
      result_EXCO_1 = await client.query(
        `SELECT outstanding_epf FROM users WHERE user_id='UPOUT1'`
      );
      result_EXCO_2 = await client.query(
        `SELECT outstanding_epf FROM users WHERE user_id='UPOUT2'`
      );

      result_OSL = await client.query(
        `SELECT outstanding_epf FROM users WHERE user_type='OSL'`
      );

      result_ROOT = await client.query(
        `SELECT outstanding_epf FROM users WHERE user_type='ROOT'`
      );
      await client.query("COMMIT");
    } catch (err) {
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
    expect(result_EXCO_1["rows"][0]["outstanding_epf"]).toBe(0);
    expect(result_EXCO_2["rows"][0]["outstanding_epf"]).toBe(1);
    const OSL_check = result_OSL.rows.every(
      (row) => row["outstanding_epf"] === 1
    );
    const ROOT_check = result_ROOT.rows.every(
      (row) => row["outstanding_epf"] === 1
    );
    expect(OSL_check).toBeTruthy();
    expect(ROOT_check).toBeTruthy();
  });

  afterAll(async () => {
    await deleteFromUsers(test_pool);
  });
});
