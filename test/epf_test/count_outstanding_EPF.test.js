import {count_outstanding_EPF, createEPF, updateEPF, deleteEPF} from "../../models/epf_db.js";
import {createEXCO} from "../../models/exco_db.js";
import {createOSL} from "../../models/osl_db.js";
import {createROOT} from "../../models/root_db.js";
import {createPool, deleteFromEXCOs, deleteFromOSLs, deleteFromROOTs, deleteFromEPFs} from "./epf_test_utils.js";

import path from "path";
import fs from "fs";

let pool;

describe("count_outstanding_EPF", () => {
    beforeAll(async () => {
        pool = createPool();
        await deleteFromEXCOs(pool);
        await deleteFromOSLs(pool);
        await deleteFromROOTs(pool);

        await createEXCO("user 1", "user1@mymail.sutd.edu.sg", pool);
        await createEXCO("user 2", "user2@mymail.sutd.edu.sg", pool);
        await createOSL("user 1", "user1@mymail.sutd.edu.sg", pool);
        await createOSL("user 2", "user2@mymail.sutd.edu.sg", pool);
        await createROOT("user 1", "user1@mymail.sutd.edu.sg", pool);
        await createROOT("user 2", "user2@mymail.sutd.edu.sg", pool);
      });


    beforeEach(async() => {
        await deleteFromEPFs(pool);
        
        const jsonFilePath_1 = path.join(__dirname, 'count_outstanding_EPF_testjson', 'createEPF_test1_1.json');
        const jsonData_1 = fs.readFileSync(jsonFilePath_1, 'utf-8');
        const data_1 = JSON.parse(jsonData_1);

        const jsonFilePath_2 = path.join(__dirname, 'count_outstanding_EPF_testjson', 'createEPF_test1_2.json');
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, 'utf-8');
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
          g_comments_root_1
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
            g_comments_root_2
          } = data_2;

          await Promise.all([
          createEPF(
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
            pool
          ),

          createEPF(
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
            pool
          )
          ])
    })

    test("Test ID: 1 - Count Outstanding EPFs", async()=>{

          const result = await count_outstanding_EPF(pool)
          
          const result_EXCO = await pool.query(`SELECT outstanding_epf FROM EXCO`);
          const EXCO_check = result_EXCO.rows.every((row) => row["outstanding_epf"] === parseInt(result));

          const result_OSL = await pool.query(`SELECT outstanding_epf FROM OSL`);
          const OSL_check = result_OSL.rows.every((row) => row["outstanding_epf"] === parseInt(result));

          const result_ROOT = await pool.query(`SELECT outstanding_epf FROM ROOT`);
          const ROOT_check = result_ROOT.rows.every((row) => row["outstanding_epf"] === parseInt(result));
          
          expect(result).toBe("1");
          expect(EXCO_check).toBeTruthy();
          expect(OSL_check).toBeTruthy();
          expect(ROOT_check).toBeTruthy();
        })


    test("Test ID: 2 - Count Outstanding EPFs after update of 1 EPF from 'Approved' to 'Pending'", async()=>{

      
      const jsonFilePath = path.join(__dirname, 'count_outstanding_EPF_testjson', 'updateEPF_test2.json');
      const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
      const data = JSON.parse(jsonData);
      
      const {
          epf_id,
          status,
          exco_user_id,
          a_name,
          a_student_id,
          a_organisation,
          a_contact_number,
          a_email,
          a_comments_osl,
          a_comments_root,
          b_event_name,
          b_target_audience,
          b_event_schedule,
          b_expected_turnout,
          b_event_objective,
          b_comments_osl,
          b_comments_root,
          c1_date,
          c1_time,
          c1_activity_and_description,
          c1_venue,
          c2_date,
          c2_time,
          c2_activity_and_description,
          c2_venue,
          c3_date,
          c3_time,
          c3_activity_and_description,
          c3_venue,
          c3_cleanup_date,
          c3_cleanup_time,
          c3_cleanup_activity_and_description,
          c3_cleanup_venue,
          c_comments_osl,
          c_comments_root,
          d1a_club_income_fund,
          d1a_osl_seed_fund,
          d1a_donation,
          d1b_revenue,
          d1b_donation_or_scholarship,
          d1b_total_source_of_funds,
          d11_items_goods_services,
          d11_price,
          d11_quantity,
          d11_amount,
          d11_total_revenue,
          d2_items,
          d2_reason_for_purchase,
          d2_venue,
          d2_total_expenditure,
          d_comments_osl,
          d_comments_root,
          e_personal_data,
          e_comments_osl,
          e_comments_root,
          f_name,
          f_student_id,
          f_position,
          f_comments_osl,
          f_comments_root,
          g_1_1,
          g_1_2,
          g_1_3,
          g_2_1,
          g_2_2,
          g_2_3,
          g_3_1,
          g_3_2,
          g_3_3,
          g_4_1,
          g_4_2,
          g_4_3,
          g_5_1,
          g_5_2,
          g_5_3,
          g_6_1,
          g_6_2,
          g_6_3,
          g_7_1,
          g_7_2,
          g_7_3,
          g_comments_osl,
          g_comments_root
        } = data;

        const updatedEPF = await updateEPF(
          epf_id,
          status,
          exco_user_id,
          a_name,
          a_student_id,
          a_organisation,
          a_contact_number,
          a_email,
          a_comments_osl,
          a_comments_root,
          b_event_name,
          b_target_audience,
          b_event_schedule,
          b_expected_turnout,
          b_event_objective,
          b_comments_osl,
          b_comments_root,
          c1_date,
          c1_time,
          c1_activity_and_description,
          c1_venue,
          c2_date,
          c2_time,
          c2_activity_and_description,
          c2_venue,
          c3_date,
          c3_time,
          c3_activity_and_description,
          c3_venue,
          c3_cleanup_date,
          c3_cleanup_time,
          c3_cleanup_activity_and_description,
          c3_cleanup_venue,
          c_comments_osl,
          c_comments_root,
          d1a_club_income_fund,
          d1a_osl_seed_fund,
          d1a_donation,
          d1b_revenue,
          d1b_donation_or_scholarship,
          d1b_total_source_of_funds,
          d11_items_goods_services,
          d11_price,
          d11_quantity,
          d11_amount,
          d11_total_revenue,
          d2_items,
          d2_reason_for_purchase,
          d2_venue,
          d2_total_expenditure,
          d_comments_osl,
          d_comments_root,
          e_personal_data,
          e_comments_osl,
          e_comments_root,
          f_name,
          f_student_id,
          f_position,
          f_comments_osl,
          f_comments_root,
          g_1_1,
          g_1_2,
          g_1_3,
          g_2_1,
          g_2_2,
          g_2_3,
          g_3_1,
          g_3_2,
          g_3_3,
          g_4_1,
          g_4_2,
          g_4_3,
          g_5_1,
          g_5_2,
          g_5_3,
          g_6_1,
          g_6_2,
          g_6_3,
          g_7_1,
          g_7_2,
          g_7_3,
          g_comments_osl,
          g_comments_root,
          pool
        )
      
      const result = await count_outstanding_EPF(pool)
      
      const result_EXCO = await pool.query(`SELECT outstanding_epf FROM EXCO`);
      const EXCO_check = result_EXCO.rows.every((row) => row["outstanding_epf"] === parseInt(result));

      const result_OSL = await pool.query(`SELECT outstanding_epf FROM OSL`);
      const OSL_check = result_OSL.rows.every((row) => row["outstanding_epf"] === parseInt(result));

      const result_ROOT = await pool.query(`SELECT outstanding_epf FROM ROOT`);
      const ROOT_check = result_ROOT.rows.every((row) => row["outstanding_epf"] === parseInt(result));
      
      expect(result).toBe("2");
      expect(EXCO_check).toBeTruthy();
      expect(OSL_check).toBeTruthy();
      expect(ROOT_check).toBeTruthy();
    })

  test("Test ID: 3 - Count Outstanding EPFs after deletetion of 1 EPF", async()=>{

    await deleteEPF(1,pool)

    const result = await count_outstanding_EPF(pool)
    
    const result_EXCO = await pool.query(`SELECT outstanding_epf FROM EXCO`);
    const EXCO_check = result_EXCO.rows.every((row) => row["outstanding_epf"] === parseInt(result));

    const result_OSL = await pool.query(`SELECT outstanding_epf FROM OSL`);
    const OSL_check = result_OSL.rows.every((row) => row["outstanding_epf"] === parseInt(result));

    const result_ROOT = await pool.query(`SELECT outstanding_epf FROM ROOT`);
    const ROOT_check = result_ROOT.rows.every((row) => row["outstanding_epf"] === parseInt(result));
    
    expect(result).toBe("1");
    expect(EXCO_check).toBeTruthy();
    expect(OSL_check).toBeTruthy();
    expect(ROOT_check).toBeTruthy();
  })


    afterAll(async()=>{
        await pool.end();
    })
    
}) 