import {createEPF,deleteEPF} from "../../models/epf_db.js";
import {createUser} from "../../models/user_db.js";
import {uploadFiles, downloadFiles, getFiles} from "../../models/files_db.js";
import {createPool, deleteFromUsers, deleteFromEPFs, deleteFromFiles} from "./files_test_utils.js";

import path from "path";
import fs from "fs";
import AdmZip from 'adm-zip';

let pool;



describe("uploadFiles", () => {
    beforeAll(async () => {
        pool = await createPool();
        await deleteFromUsers(pool);
        await createUser("1", "name 1", "name_1@mymail.sutd.edu.sg", "exco", pool);
      });


    beforeEach(async() => {
        await deleteFromEPFs(pool);
        await deleteFromFiles(pool);
        
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


          const FilePath_1 = path.join(__dirname, 'uploadFiles_testfiles', 'testFile_1.pdf');
          const testFile_1 = fs.readFileSync(FilePath_1);

          const FilePath_2 = path.join(__dirname, 'uploadFiles_testfiles', 'testFile_2.pdf');
          const testFile_2 = fs.readFileSync(FilePath_2);

          let upload_files = [{originalname: "testFile_1.pdf", buffer: Buffer.from(testFile_1)},
                            {originalname: "testFile_2.pdf", buffer: Buffer.from(testFile_2)}]

          await uploadFiles(1, upload_files, pool)
    })

    test("Test ID: 1 - Get Files", async()=>{

        const file_metadata = await getFiles(1,pool)
        expect(JSON.stringify(file_metadata)).toBe(JSON.stringify({ '1': 'testFile_1.pdf', '2': 'testFile_2.pdf' }))
    })

    afterAll(async()=>{
        await pool.end();
    })
    
}) 

