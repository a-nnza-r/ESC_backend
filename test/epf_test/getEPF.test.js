import {createEPF,getEPF} from "../../models/epf_db.js";
import {createUser} from "../../models/user_db.js";
import {createPool, deleteFromUsers, deleteFromEPFs} from "./epf_test_utils.js";

import path from "path";
import fs from "fs";

let pool;

describe("getEPF", () => {
    beforeAll(async () => {
        pool = await createPool();
        await deleteFromUsers(pool);
        await createUser("1", "name 1", "name_1@mymail.sutd.edu.sg", "exco", pool);
      });


    beforeEach(async() => {
        await deleteFromEPFs(pool);
        
        const jsonFilePath = path.join(__dirname, 'createEPF_testjson', 'createEPF_test1.json');
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const data = JSON.parse(jsonData);
        const {
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

          await createEPF(
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
    })


    test("Test ID: 1 - Valid EPF ID", async()=>{

          const result = await getEPF(1,pool)

          const jsonFilePath = path.join(__dirname, 'createEPF_testjson', 'createEPF_test1.json');
          const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
          const data = JSON.parse(jsonData);
          
          let matches = true;
          for(let key in data) {
            if(String(data[key])!==String(result[0][key])) {
              matches = false;
              break;
            }
          }
          
          expect(result[0]["epf_id"]).toBe(1)
          expect(matches).toBeTruthy();
        })


    test("Test ID: 2 - Invalid EPF datatype", async()=>{
        const result = await expect(getEPF("1",pool)).rejects.toThrow("Unexpected data type");
        })

    test("Test ID: 3 - Non-existent EPF ID", async()=>{
        const result = await expect(getEPF(2,pool)).rejects.toThrow("Non-existent epf");
        })

    test("Test ID: 4 - Get multiple EPFs concurrently", async()=>{

        const jsonFilePath_2 = path.join(__dirname, 'createEPF_testjson', 'createEPF_test8_2.json');
        const jsonData_2 = fs.readFileSync(jsonFilePath_2, 'utf-8');
        const data_2 = JSON.parse(jsonData_2);
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

          await createEPF(
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


        const jsonFilePath_1 = path.join(__dirname, 'createEPF_testjson', 'createEPF_test1.json');
        const jsonData_1 = fs.readFileSync(jsonFilePath_1, 'utf-8');
        const data_1 = JSON.parse(jsonData_1);

        const results = await Promise.all([await getEPF(1,pool), await getEPF(2,pool)])
        const result_1 = results[0]
        const result_2 = results[1]
        
        let matches_1 = true;
        for(let key in data_1) {
          if(String(data_1[key])!==String(result_1[0][key])) {
            matches_1 = false;
            break;
          }
        }
        expect(result_1[0]["epf_id"]).toBe(1)
        expect(matches_1).toBeTruthy();

        let matches_2 = true;
        for(let key in data_2) {
          const originalKey = key.replace(/_2$/, ""); // Remove the "_1" suffix from the key
          if(String(data_2[key])!==String(result_2[0][originalKey])) {
            matches_2 = false;
            break;
          }
        }
        expect(result_2[0]["epf_id"]).toBe(2)
        expect(matches_2).toBeTruthy();

        })

    afterAll(async()=>{
        await pool.end();
    })
    
}) 