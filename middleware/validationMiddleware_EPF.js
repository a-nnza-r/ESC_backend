export function validateJSON_createEPF(req, res, next) {
  const expectedKeys = [
    "status",
    "exco_user_id",
    "a_name",
    "a_student_id",
    "a_organisation",
    "a_contact_number",
    "a_email",
    "a_comments_osl",
    "a_comments_root",
    "b_event_name",
    "b_target_audience",
    "b_event_schedule",
    "b_expected_turnout",
    "b_event_objective",
    "b_comments_osl",
    "b_comments_root",
    "c1_date",
    "c1_time",
    "c1_activity_and_description",
    "c1_venue",
    "c2_date",
    "c2_time",
    "c2_activity_and_description",
    "c2_venue",
    "c3_date",
    "c3_time",
    "c3_activity_and_description",
    "c3_venue",
    "c3_cleanup_date",
    "c3_cleanup_time",
    "c3_cleanup_activity_and_description",
    "c3_cleanup_venue",
    "c_comments_osl",
    "c_comments_root",
    "d1a_club_income_fund",
    "d1a_osl_seed_fund",
    "d1a_donation",
    "d1b_revenue",
    "d1b_donation_or_scholarship",
    "d1b_total_source_of_funds",
    "d11_items_goods_services",
    "d11_price",
    "d11_quantity",
    "d11_amount",
    "d11_total_revenue",
    "d2_items",
    "d2_reason_for_purchase",
    "d2_venue",
    "d2_total_expenditure",
    "d_comments_osl",
    "d_comments_root",
    "e_personal_data",
    "e_comments_osl",
    "e_comments_root",
    "f_name",
    "f_student_id",
    "f_position",
    "f_comments_osl",
    "f_comments_root",
    "g_1_1",
    "g_1_2",
    "g_1_3",
    "g_2_1",
    "g_2_2",
    "g_2_3",
    "g_3_1",
    "g_3_2",
    "g_3_3",
    "g_4_1",
    "g_4_2",
    "g_4_3",
    "g_5_1",
    "g_5_2",
    "g_5_3",
    "g_6_1",
    "g_6_2",
    "g_6_3",
    "g_7_1",
    "g_7_2",
    "g_7_3",
    "g_comments_osl",
    "g_comments_root",
  ];

  try {
    const incomingKeys_createEPF = Object.keys(req.body);

    // Check if every key in req.body is an expected key
    const areAllKeysValid = incomingKeys_createEPF.every((key) =>
      expectedKeys.includes(key)
    );

    if (!areAllKeysValid) {
      // Determine the extra keys that are not expected
      const extraKeys = incomingKeys_createEPF.filter(
        (key) => !expectedKeys.includes(key)
      );

      return res.status(400).json({
        error: "Invalid JSON payload format for createEPF",
        extraKeys: extraKeys,
      });
    } else {
      next();
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  }
}

export function validateJSON_updateEPF(req, res, next) {
  const expectedKeys = [
    "epf_id",
    "status",
    "exco_user_id",
    "a_name",
    "a_student_id",
    "a_organisation",
    "a_contact_number",
    "a_email",
    "a_comments_osl",
    "a_comments_root",
    "b_event_name",
    "b_target_audience",
    "b_event_schedule",
    "b_expected_turnout",
    "b_event_objective",
    "b_comments_osl",
    "b_comments_root",
    "c1_date",
    "c1_time",
    "c1_activity_and_description",
    "c1_venue",
    "c2_date",
    "c2_time",
    "c2_activity_and_description",
    "c2_venue",
    "c3_date",
    "c3_time",
    "c3_activity_and_description",
    "c3_venue",
    "c3_cleanup_date",
    "c3_cleanup_time",
    "c3_cleanup_activity_and_description",
    "c3_cleanup_venue",
    "c_comments_osl",
    "c_comments_root",
    "d1a_club_income_fund",
    "d1a_osl_seed_fund",
    "d1a_donation",
    "d1b_revenue",
    "d1b_donation_or_scholarship",
    "d1b_total_source_of_funds",
    "d11_items_goods_services",
    "d11_price",
    "d11_quantity",
    "d11_amount",
    "d11_total_revenue",
    "d2_items",
    "d2_reason_for_purchase",
    "d2_venue",
    "d2_total_expenditure",
    "d_comments_osl",
    "d_comments_root",
    "e_personal_data",
    "e_comments_osl",
    "e_comments_root",
    "f_name",
    "f_student_id",
    "f_position",
    "f_comments_osl",
    "f_comments_root",
    "g_1_1",
    "g_1_2",
    "g_1_3",
    "g_2_1",
    "g_2_2",
    "g_2_3",
    "g_3_1",
    "g_3_2",
    "g_3_3",
    "g_4_1",
    "g_4_2",
    "g_4_3",
    "g_5_1",
    "g_5_2",
    "g_5_3",
    "g_6_1",
    "g_6_2",
    "g_6_3",
    "g_7_1",
    "g_7_2",
    "g_7_3",
    "g_comments_osl",
    "g_comments_root",
  ];

  try {
    const incomingKeys_updateEPF = Object.keys(req.body);
    const isPayloadValid = incomingKeys_updateEPF.every((key) =>
      expectedKeys.includes(key)
    );
    if (!isPayloadValid) {
      return res
        .status(400)
        .json({ error: "Invalid JSON payload format for updateEPF" });
    } else {
      next();
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  } finally {
  }
}

export function validateParam_getEPF(req, res, next) {
  try {
    if (!req.query.hasOwnProperty("epf_id")) {
      return res
        .status(400)
        .json({ error: "Missing epf_id key for get EPF query" });
    } else {
      next();
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  } finally {
  }
}

export function validateParam_deleteEPF(req, res, next) {
  try {
    if (!req.query.hasOwnProperty("epf_id")) {
      return res
        .status(400)
        .json({ error: "Missing epf_id key for delete EPF query" });
    } else {
      next();
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  } finally {
  }
}
