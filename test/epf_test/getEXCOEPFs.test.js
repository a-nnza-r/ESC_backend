import {
  createEPF,
  getEPFs,
  deleteEPF,
  updateEPF,
} from "../../models/epf_db.js";
import { createUser, getEXCOEPFs } from "../../models/user_db.js";
import { test_pool, deleteFromUsers, deleteFromEPFs } from "./epf_test_utils";

import path from "path";
import fs from "fs";

let epfs = [];

describe("getEXCOEPFs", () => {
  beforeAll(async () => {
    await deleteFromEPFs(test_pool);
  });
  beforeEach(async () => {
    epfs = [];
    await deleteFromUsers(test_pool);
    await createUser(
      "EXCO1",
      "name 1",
      "name_1@mymail.sutd.edu.sg",
      "exco",
      test_pool
    );
    await createUser(
      "EXCO2",
      "name 2",
      "name_2@mymail.sutd.edu.sg",
      "exco",
      test_pool
    );
    await createUser(
      "OSL1",
      "name 3",
      "name_3@mymail.sutd.edu.sg",
      "osl",
      test_pool
    );
    await createUser(
      "ROOT1",
      "name 4",
      "name_4@mymail.sutd.edu.sg",
      "root",
      test_pool
    );

    const Exco1Test1 = path.join(
      __dirname,
      "getEXCOEPFsjson",
      "getEXCOEPFsjsonExco1Test1.json"
    );
    const Exco1Test2 = path.join(
      __dirname,
      "getEXCOEPFsjson",
      "getEXCOEPFsjsonExco1Test2.json"
    );
    const Exco2Test1 = path.join(
      __dirname,
      "getEXCOEPFsjson",
      "getEXCOEPFsjsonExco2Test1.json"
    );
    const Exco2Test2 = path.join(
      __dirname,
      "getEXCOEPFsjson",
      "getEXCOEPFsjsonExco2Test2.json"
    );

    const pathArr = [Exco1Test1, Exco1Test2, Exco2Test1, Exco2Test2];

    for (const jsonFilePath of pathArr) {
      const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
      const data = JSON.parse(jsonData);
      epfs.push(data);
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
        g_comments_root,
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
        test_pool
      );
    }
  });

  // test cases
  // Test Case 1: Test if the function returns the first two EPFs for EXCO1
  test("should return the first two EPFs for EXCO1", async () => {
    const excoEPFs = await getEXCOEPFs("EXCO1", test_pool);
    expect(excoEPFs).toHaveLength(2);

    // Assuming your EPFs array contains data for EXCO1 followed by data for EXCO2
    const expectedEPF1 = { ...epfs[0], is_deleted: false };
    const expectedEPF2 = { ...epfs[1], is_deleted: false };

    let matches_1 = true;
    for (let key in expectedEPF1) {
      if (String(expectedEPF1[key]) !== String(excoEPFs[0][key])) {
        console.log(key, String(expectedEPF1[key]), String(excoEPFs[0][key]));
        matches_1 = false;
        break;
      }
    }
    let matches_2 = true;
    for (let key in expectedEPF2) {
      if (String(expectedEPF2[key]) !== String(excoEPFs[1][key])) {
        matches_2 = false;
        break;
      }
    }

    // Use toEqual over the whole objects
    expect(matches_1).toEqual(true);
    expect(matches_2).toEqual(true);
  });

  // Test Case 2: Test if the function returns the last two EPFs for EXCO2
  test("should return the last two EPFs for EXCO2", async () => {
    const excoEPFs = await getEXCOEPFs("EXCO2", test_pool);
    expect(excoEPFs).toHaveLength(2);

    const expectedEPF3 = { ...epfs[2], is_deleted: false };
    const expectedEPF4 = { ...epfs[3], is_deleted: false };

    let matches_1 = true;
    for (let key in expectedEPF3) {
      if (String(expectedEPF3[key]) != String(excoEPFs[0][key])) {
        matches_1 = false;
        break;
      }
    }

    let matches_2 = true;
    for (let key in expectedEPF4) {
      if (String(expectedEPF4[key]) !== String(excoEPFs[1][key])) {
        console.log(
          key,
          String(expectedEPF4[key]),
          String(excoEPFs[1][originalKey])
        );
        matches_2 = false;
        break;
      }
    }
    expect(matches_1).toBeTruthy();
    expect(matches_2).toBeTruthy();
  });

  // Test Case 3: Test if the function returns an empty array for ROOT1
  test("should return an empty array for ROOT1", async () => {
    const rootUserId = "ROOT1"; // Assuming this user has no EPFs
    const rootEPFs = await getEXCOEPFs(rootUserId, test_pool);
    expect(rootEPFs).toHaveLength(0);
  });

  // Test Case 4: Test if the function returns an empty array for ROOT2
  test("should return an empty array for ROOT2", async () => {
    const rootUserId = "ROOT2"; // Assuming this user has no EPFs
    const rootEPFs = await getEXCOEPFs(rootUserId, test_pool);
    expect(rootEPFs).toHaveLength(0);
  });

  // /// Test Case 5: Test if the function returns the updated EPF when exco_user_id is changed
  // test("should return the updated EPF for EXCO2 after updating exco_user_id", async () => {
  //   // Get the original EPF data for comparison
  //   console.log(epfs[2]);
  //   const originalEPF = epfs[2];
  //   const epfID = originalEPF["epf_id"];

  //   const Exco2Test1UpdatedPath = path.join(
  //     __dirname,
  //     "getEXCOEPFsjson",
  //     "getEXCOEPFsjsonExco2Test1Updated.json"
  //   );

  //   const jsonData = fs.readFileSync(Exco2Test1UpdatedPath, "utf-8");
  //   const data = JSON.parse(jsonData);
  //   const {
  //     status,
  //     exco_user_id,
  //     a_name,
  //     a_student_id,
  //     a_organisation,
  //     a_contact_number,
  //     a_email,
  //     a_comments_osl,
  //     a_comments_root,
  //     b_event_name,
  //     b_target_audience,
  //     b_event_schedule,
  //     b_expected_turnout,
  //     b_event_objective,
  //     b_comments_osl,
  //     b_comments_root,
  //     c1_date,
  //     c1_time,
  //     c1_activity_and_description,
  //     c1_venue,
  //     c2_date,
  //     c2_time,
  //     c2_activity_and_description,
  //     c2_venue,
  //     c3_date,
  //     c3_time,
  //     c3_activity_and_description,
  //     c3_venue,
  //     c3_cleanup_date,
  //     c3_cleanup_time,
  //     c3_cleanup_activity_and_description,
  //     c3_cleanup_venue,
  //     c_comments_osl,
  //     c_comments_root,
  //     d1a_club_income_fund,
  //     d1a_osl_seed_fund,
  //     d1a_donation,
  //     d1b_revenue,
  //     d1b_donation_or_scholarship,
  //     d1b_total_source_of_funds,
  //     d11_items_goods_services,
  //     d11_price,
  //     d11_quantity,
  //     d11_amount,
  //     d11_total_revenue,
  //     d2_items,
  //     d2_reason_for_purchase,
  //     d2_venue,
  //     d2_total_expenditure,
  //     d_comments_osl,
  //     d_comments_root,
  //     e_personal_data,
  //     e_comments_osl,
  //     e_comments_root,
  //     f_name,
  //     f_student_id,
  //     f_position,
  //     f_comments_osl,
  //     f_comments_root,
  //     g_1_1,
  //     g_1_2,
  //     g_1_3,
  //     g_2_1,
  //     g_2_2,
  //     g_2_3,
  //     g_3_1,
  //     g_3_2,
  //     g_3_3,
  //     g_4_1,
  //     g_4_2,
  //     g_4_3,
  //     g_5_1,
  //     g_5_2,
  //     g_5_3,
  //     g_6_1,
  //     g_6_2,
  //     g_6_3,
  //     g_7_1,
  //     g_7_2,
  //     g_7_3,
  //     g_comments_osl,
  //     g_comments_root,
  //   } = data;

  //   await updateEPF(
  //     epfID,
  //     status,
  //     exco_user_id,
  //     a_name,
  //     a_student_id,
  //     a_organisation,
  //     a_contact_number,
  //     a_email,
  //     a_comments_osl,
  //     a_comments_root,
  //     b_event_name,
  //     b_target_audience,
  //     b_event_schedule,
  //     b_expected_turnout,
  //     b_event_objective,
  //     b_comments_osl,
  //     b_comments_root,
  //     c1_date,
  //     c1_time,
  //     c1_activity_and_description,
  //     c1_venue,
  //     c2_date,
  //     c2_time,
  //     c2_activity_and_description,
  //     c2_venue,
  //     c3_date,
  //     c3_time,
  //     c3_activity_and_description,
  //     c3_venue,
  //     c3_cleanup_date,
  //     c3_cleanup_time,
  //     c3_cleanup_activity_and_description,
  //     c3_cleanup_venue,
  //     c_comments_osl,
  //     c_comments_root,
  //     d1a_club_income_fund,
  //     d1a_osl_seed_fund,
  //     d1a_donation,
  //     d1b_revenue,
  //     d1b_donation_or_scholarship,
  //     d1b_total_source_of_funds,
  //     d11_items_goods_services,
  //     d11_price,
  //     d11_quantity,
  //     d11_amount,
  //     d11_total_revenue,
  //     d2_items,
  //     d2_reason_for_purchase,
  //     d2_venue,
  //     d2_total_expenditure,
  //     d_comments_osl,
  //     d_comments_root,
  //     e_personal_data,
  //     e_comments_osl,
  //     e_comments_root,
  //     f_name,
  //     f_student_id,
  //     f_position,
  //     f_comments_osl,
  //     f_comments_root,
  //     g_1_1,
  //     g_1_2,
  //     g_1_3,
  //     g_2_1,
  //     g_2_2,
  //     g_2_3,
  //     g_3_1,
  //     g_3_2,
  //     g_3_3,
  //     g_4_1,
  //     g_4_2,
  //     g_4_3,
  //     g_5_1,
  //     g_5_2,
  //     g_5_3,
  //     g_6_1,
  //     g_6_2,
  //     g_6_3,
  //     g_7_1,
  //     g_7_2,
  //     g_7_3,
  //     g_comments_osl,
  //     g_comments_root,
  //     test_pool
  //   );

  //   const excoEPFs = await getEXCOEPFs("EXCO1", test_pool);
  //   expect(excoEPFs).toHaveLength(3);
  //   //
  // });

  // // // Test Case 6: Test if the function correctly handles deleted EPFs
  // // test("should not return deleted EPFs for EXCO1", async () => {
  // //   // Get the original EPF data for comparison
  // //   const originalEPF = epfs[3];
  // //   const epfID = originalEPF["epf_id"];

  // //   await deleteEPF(epfID, test_pool);
  // //   const excoEPFsEXCO2 = await getEXCOEPFs("EXCO2", test_pool);
  // //   expect(excoEPFsEXCO2).toHaveLength(0);
  // // });

  afterAll(async () => {
    await deleteFromUsers(test_pool);
    await deleteFromEPFs(test_pool);
  });
});
