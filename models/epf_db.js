import { db_pool } from "./db_utils.js";

const epf_db_datatypes_create = {
  status: "string",
  exco_user_id: "string",
  a_name: "string",
  a_student_id: "number",
  a_organisation: "string",
  a_contact_number: "number",
  a_email: "string",
  a_comments_osl: "string",
  a_comments_root: "string",
  b_event_name: "string",
  b_target_audience: "string",
  b_event_schedule: "string",
  b_expected_turnout: "number",
  b_event_objective: "string",
  b_comments_osl: "string",
  b_comments_root: "string",
  c1_date: "object",
  c1_time: "object",
  c1_activity_and_description: "object",
  c1_venue: "object",
  c2_date: "object",
  c2_time: "object",
  c2_activity_and_description: "object",
  c2_venue: "object",
  c3_date: "object",
  c3_time: "object",
  c3_activity_and_description: "object",
  c3_venue: "object",
  c3_cleanup_date: "object",
  c3_cleanup_time: "object",
  c3_cleanup_activity_and_description: "object",
  c3_cleanup_venue: "object",
  c_comments_osl: "string",
  c_comments_root: "string",
  d1a_club_income_fund: "number",
  d1a_osl_seed_fund: "number",
  d1a_donation: "number",
  d1b_revenue: "number",
  d1b_donation_or_scholarship: "number",
  d1b_total_source_of_funds: "number",
  d11_items_goods_services: "object",
  d11_price: "object",
  d11_quantity: "object",
  d11_amount: "object",
  d11_total_revenue: "number",
  d2_items: "object",
  d2_reason_for_purchase: "object",
  d2_venue: "object",
  d2_total_expenditure: "number",
  d_comments_osl: "string",
  d_comments_root: "string",
  e_personal_data: "number",
  e_comments_osl: "string",
  e_comments_root: "string",
  f_name: "object",
  f_student_id: "object",
  f_position: "object",
  f_comments_osl: "string",
  f_comments_root: "string",
  g_1_1: "string",
  g_1_2: "string",
  g_1_3: "string",
  g_2_1: "string",
  g_2_2: "string",
  g_2_3: "string",
  g_3_1: "string",
  g_3_2: "string",
  g_3_3: "string",
  g_4_1: "string",
  g_4_2: "string",
  g_4_3: "string",
  g_5_1: "string",
  g_5_2: "string",
  g_5_3: "string",
  g_6_1: "string",
  g_6_2: "string",
  g_6_3: "string",
  g_7_1: "string",
  g_7_2: "string",
  g_7_3: "string",
  g_comments_osl: "string",
  g_comments_root: "string",
};

var epf_db_datatypes_update = { ...epf_db_datatypes_create };
epf_db_datatypes_update = { epf_id: "number", ...epf_db_datatypes_create };

const status_types = ["Draft", "Pending Approval", "Approved", "Rejected"];

export async function update_outstanding_EPF_count(client) {
  try {
    const exco_user_ids = await client.query(
      `SELECT user_id FROM users WHERE user_type=$1 FOR UPDATE`,
      ["exco"]
    );

    for (let i in exco_user_ids["rows"]) {
      const userId = exco_user_ids["rows"][i]["user_id"];
      let result = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE status!=$1 AND exco_user_id=$2 AND is_deleted = false`,
        ["Approved", userId]
      );

      await client.query(
        `UPDATE users SET outstanding_epf=$1 WHERE user_id=$2`,
        [result["rows"][0]["count"], userId]
      );
    }

    const total_count = await client.query(
      `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND is_deleted = false`,
      ["Approved"]
    );

    await client.query(
      `UPDATE users SET outstanding_epf=$1 WHERE user_type!=$2`,
      [total_count["rows"][0]["count"], "exco"]
    );
  } catch (err) {
    throw err;
  }
}

export async function get_outstanding_EPF_count(exco_user_id, client) {
  try {
    let result = await client.query(
      `SELECT COUNT(*) FROM EPFS WHERE status != $1 AND exco_user_id=$2 AND is_deleted = false`,
      ["Approved", exco_user_id]
    );
    return result.rows[0]["count"];
  } catch (err) {
    throw err;
  }
}

export async function createEPF(
  status,
  exco_user_id,
  A_name,
  A_student_id,
  A_organisation,
  A_contact_number,
  A_email,
  A_comments_OSL,
  A_comments_ROOT,
  B_event_name,
  B_target_audience,
  B_event_schedule,
  B_expected_turnout,
  B_event_objective,
  B_comments_OSL,
  B_comments_ROOT,
  C1_date,
  C1_time,
  C1_activity_and_description,
  C1_venue,
  C2_date,
  C2_time,
  C2_activity_and_description,
  C2_venue,
  C3_date,
  C3_time,
  C3_activity_and_description,
  C3_venue,
  C3_cleanup_date,
  C3_cleanup_time,
  C3_cleanup_activity_and_description,
  C3_cleanup_venue,
  C_comments_OSL,
  C_comments_ROOT,
  D1A_club_income_fund,
  D1A_osl_seed_fund,
  D1A_donation,
  D1B_revenue,
  D1B_donation_or_scholarship,
  D1B_total_source_of_funds,
  D11_items_goods_services,
  D11_price,
  D11_quantity,
  D11_amount,
  D11_total_revenue,
  D2_items,
  D2_reason_for_purchase,
  D2_venue,
  D2_total_expenditure,
  D_comments_OSL,
  D_comments_ROOT,
  E_personal_data,
  E_comments_OSL,
  E_comments_ROOT,
  F_name,
  F_student_id,
  F_position,
  F_comments_OSL,
  F_comments_ROOT,
  G_1_1,
  G_1_2,
  G_1_3,
  G_2_1,
  G_2_2,
  G_2_3,
  G_3_1,
  G_3_2,
  G_3_3,
  G_4_1,
  G_4_2,
  G_4_3,
  G_5_1,
  G_5_2,
  G_5_3,
  G_6_1,
  G_6_2,
  G_6_3,
  G_7_1,
  G_7_2,
  G_7_3,
  G_comments_OSL,
  G_comments_ROOT,
  pool = db_pool
) {
  const columnParams = new Array(82)
    .fill()
    .map((_, i) => `$${i + 1}`)
    .join(",");
  var values = [
    status,
    exco_user_id,
    A_name,
    A_student_id,
    A_organisation,
    A_contact_number,
    A_email,
    A_comments_OSL,
    A_comments_ROOT,

    B_event_name,
    B_target_audience,
    B_event_schedule,
    B_expected_turnout,
    B_event_objective,
    B_comments_OSL,
    B_comments_ROOT,

    C1_date,
    C1_time,
    C1_activity_and_description,
    C1_venue,

    C2_date,
    C2_time,
    C2_activity_and_description,
    C2_venue,

    C3_date,
    C3_time,
    C3_activity_and_description,
    C3_venue,

    C3_cleanup_date,
    C3_cleanup_time,
    C3_cleanup_activity_and_description,
    C3_cleanup_venue,
    C_comments_OSL,
    C_comments_ROOT,

    D1A_club_income_fund,
    D1A_osl_seed_fund,
    D1A_donation,
    D1B_revenue,
    D1B_donation_or_scholarship,
    D1B_total_source_of_funds,

    D11_items_goods_services,
    D11_price,
    D11_quantity,
    D11_amount,
    D11_total_revenue,

    D2_items,
    D2_reason_for_purchase,
    D2_venue,
    D2_total_expenditure,
    D_comments_OSL,
    D_comments_ROOT,

    E_personal_data,
    E_comments_OSL,
    E_comments_ROOT,

    F_name,
    F_student_id,
    F_position,
    F_comments_OSL,
    F_comments_ROOT,

    G_1_1,
    G_1_2,
    G_1_3,

    G_2_1,
    G_2_2,
    G_2_3,

    G_3_1,
    G_3_2,
    G_3_3,

    G_4_1,
    G_4_2,
    G_4_3,

    G_5_1,
    G_5_2,
    G_5_3,

    G_6_1,
    G_6_2,
    G_6_3,

    G_7_1,
    G_7_2,
    G_7_3,
    G_comments_OSL,
    G_comments_ROOT,
  ];

  const metadata = "status,exco_user_id,";
  const sectionA =
    "a_name,a_student_id,a_organisation,a_contact_number,a_email,a_comments_osl,a_comments_root,";
  const sectionB =
    "b_event_name,b_target_audience,b_event_schedule,b_expected_turnout,b_event_objective,b_comments_osl,b_comments_root,";
  const sectionC1 = "c1_date,c1_time,c1_activity_and_description,c1_venue,";
  const sectionC2 = "c2_date,c2_time,c2_activity_and_description,c2_venue,";
  const sectionC3 = "c3_date,c3_time,c3_activity_and_description,c3_venue,";
  const sectionC3Cleanup =
    "c3_cleanup_date,c3_cleanup_time,c3_cleanup_activity_and_description,c3_cleanup_venue,c_comments_osl,c_comments_root,";
  const sectionD1 =
    "d1a_club_income_fund,d1a_osl_seed_fund,d1a_donation,d1b_revenue,d1b_donation_or_scholarship,d1b_total_source_of_funds,";
  const sectionD11 =
    "d11_items_goods_services,d11_price,d11_quantity,d11_amount,d11_total_revenue,";
  const sectionD2 =
    "d2_items,d2_reason_for_purchase,d2_venue,d2_total_expenditure,d_comments_osl,d_comments_root,";
  const sectionE = "e_personal_data,e_comments_osl,e_comments_root,";
  const sectionF =
    "f_name,f_student_id,f_position,f_comments_osl,f_comments_root,";
  const sectionG1 = "g_1_1,g_1_2,g_1_3,";
  const sectionG2 = "g_2_1,g_2_2,g_2_3,";
  const sectionG3 = "g_3_1,g_3_2,g_3_3,";
  const sectionG4 = "g_4_1,g_4_2,g_4_3,";
  const sectionG5 = "g_5_1,g_5_2,g_5_3,";
  const sectionG6 = "g_6_1,g_6_2,g_6_3,";
  const sectionG7 = "g_7_1,g_7_2,g_7_3,g_comments_osl,g_comments_root";

  const column_names = metadata.concat(
    sectionA,
    sectionB,
    sectionC1,
    sectionC2,
    sectionC3,
    sectionC3Cleanup,
    sectionD1,
    sectionD11,
    sectionD2,
    sectionE,
    sectionF,
    sectionG1,
    sectionG2,
    sectionG3,
    sectionG4,
    sectionG5,
    sectionG6,
    sectionG7
  );

  const datatypes = Object.values(epf_db_datatypes_create);

  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] !== datatypes[i] && values[i] !== undefined) {
      throw new Error("Unexpected data type");
    }
  }

  //Status validation
  if (!status_types.includes(status)) {
    throw new Error("Invalid Status Type");
  }

  //Student ID validation
  const student_id_regex = /^1\d{6}$/;
  if (!student_id_regex.test(A_student_id) && A_student_id !== undefined) {
    throw new Error("Invalid Student ID");
  }

  F_student_id.forEach((student_id) => {
    if (!student_id_regex.test(parseInt(student_id)) && student_id !== "") {
      throw new Error("Invalid Student ID");
    }
  });

  //Contact number validation
  const contact_number_regex = /^[689]\d{7}$/;
  if (
    !contact_number_regex.test(A_contact_number) &&
    A_contact_number !== undefined
  ) {
    throw new Error("Invalid Contact Number");
  }

  //Email format validation
  if (A_email !== undefined) {
    const [username, domain] = A_email.split("@");
    const isValidUsername = /^[^\s@]+$/;
    const isValidDomain = /^[^\s@]+\.[^\s@]+$/;
    if (
      !A_email.includes("@") ||
      !isValidUsername.test(username) ||
      !isValidDomain.test(domain)
    ) {
      throw new Error("Invalid email format");
    }
  }

  //Validation for money
  if (
    (D1A_club_income_fund < 0 && D1A_club_income_fund !== undefined) ||
    (D1A_osl_seed_fund < 0 && D1A_osl_seed_fund !== undefined) ||
    (D1A_donation < 0 && D1A_donation !== undefined) ||
    (D1B_revenue < 0 && D1B_revenue !== undefined) ||
    (D1B_donation_or_scholarship < 0 &&
      D1B_donation_or_scholarship !== undefined) ||
    (D1B_total_source_of_funds < 0 &&
      D1B_total_source_of_funds !== undefined) ||
    (D11_total_revenue < 0 && D11_total_revenue !== undefined) ||
    (D2_total_expenditure < 0 && D2_total_expenditure !== undefined)
  ) {
    throw new Error("Invalid value for money");
  }
  D11_price.forEach((price) => {
    if (price !== "") {
      if (price < 0) {
        throw new Error("Invalid value for money");
      }
    }
  });
  D11_amount.forEach((price) => {
    if (price !== "") {
      if (price < 0) {
        throw new Error("Invalid value for money");
      }
    }
  });
  //Validation for Quantity
  D11_quantity.forEach((price) => {
    if (price !== "") {
      if (price < 0) {
        throw new Error("Invalid quantity value");
      }
    }
  });

  //Check for event name
  if (B_event_name !== undefined) {
    if (B_event_name.trim().length == 0) {
      throw new Error("Event name missing");
    }
  }

  //Validation for event schedule
  const datetime_regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (B_event_schedule !== undefined) {
    if (!datetime_regex.test(B_event_schedule)) {
      throw new Error("Invalid Datetime Format");
    }
  }

  //Validation for date
  const date_regex = /^\d{4}-\d{2}-\d{2}$/;
  C1_date.forEach((date) => {
    if (date !== "") {
      if (!date_regex.test(date)) {
        throw new Error("Invalid Date Format");
      }
    }
  });
  C2_date.forEach((date) => {
    if (date !== "") {
      if (!date_regex.test(date)) {
        throw new Error("Invalid Date Format");
      }
    }
  });
  C3_date.forEach((date) => {
    if (date !== "") {
      if (!date_regex.test(date)) {
        throw new Error("Invalid Date Format");
      }
    }
  });
  C3_cleanup_date.forEach((date) => {
    if (date !== "") {
      if (!date_regex.test(date)) {
        throw new Error("Invalid Date Format");
      }
    }
  });
  //Validation for time
  const time_regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  C1_time.forEach((time) => {
    if (time !== "") {
      if (!time_regex.test(time)) {
        throw new Error("Invalid Time Format");
      }
    }
  });

  C2_time.forEach((time) => {
    if (time !== "") {
      if (!time_regex.test(time)) {
        throw new Error("Invalid Time Format");
      }
    }
  });
  C3_time.forEach((time) => {
    if (time !== "") {
      if (!time_regex.test(time)) {
        throw new Error("Invalid Time Format");
      }
    }
  });

  C3_cleanup_time.forEach((time) => {
    if (time !== "") {
      if (!time_regex.test(time)) {
        throw new Error("Invalid Time Format");
      }
    }
  });

  let client;
  let result = null;
  let epf_count = null;
  let retryCount = 5;
  const RETRY_DELAY_MS = 200;
  while (retryCount > 0) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid exco_user_id
      const valid_exco_user_id = await client.query(
        `SELECT COUNT(*) FROM users WHERE user_id=$1`,
        [exco_user_id]
      );
      if (valid_exco_user_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent exco user id");
      }

      const query = `INSERT INTO EPFS(${column_names}) VALUES (${columnParams}) RETURNING *`;
      values = values.map((val) => (val === undefined ? null : val));
      result = await client.query(query, values);

      epf_count = await get_outstanding_EPF_count(exco_user_id, client);
      await update_outstanding_EPF_count(client);
      await client.query("COMMIT");
      return { result: result["rows"][0], epf_count: epf_count };
    } catch (err) {
      if (err.message === "Non-existent exco user id") {
        await client.query("COMMIT");
        throw err;
      } else {
        if (client) {
          await client.query("ROLLBACK");
          if (
            err.code === "40001" ||
            err.message.includes("deadlock detected")
          ) {
            // 40001 is the error code for serialization failure
            retryCount -= 1;
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
          } else {
            throw err;
          }
        } else new Error("couldnt acquire client");
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  if (retryCount <= 0) {
    throw new Error(
      "Transaction failed due to serialization error or deadlock after 5 retries"
    );
  }
}

export async function getEPF(epf_id, pool = db_pool) {
  // Check for epf_id data type
  if (typeof epf_id !== "number") {
    throw new Error("Unexpected data type");
  }

  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

      // Check for valid epf_id
      const valid_epf_id = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );

      if (valid_epf_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent epf");
      }

      result = await client.query(
        "SELECT * FROM EPFS WHERE epf_id = $1 AND is_deleted = false",
        [epf_id]
      );

      await client.query("COMMIT");
      break; // Break the retry loop upon successful transaction
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        !err.message.includes("could not serialize access") &&
        !err.message.includes("deadlock detected")
      ) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max retrieval attempts exceeded");
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  if (result["rows"].length === 0) {
    return null;
  }
  return result["rows"];
}

export async function getEPFs(pool = db_pool) {
  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
      result = await client.query(
        `SELECT * FROM EPFS WHERE is_deleted = false`
      );
      await client.query("COMMIT");
      break;
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        (err.message.includes(
          "could not serialize access due to read/write dependencies among transactions"
        ) ||
          err.message.includes("deadlock detected")) &&
        attempt < MAX_RETRIES - 1
      ) {
        continue;
      } else {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  if (result["rows"].length === 0) {
    return null;
  }
  return result["rows"];
}

export async function updateEPF(
  epf_id,
  status,
  exco_user_id,
  A_name,
  A_student_id,
  A_organisation,
  A_contact_number,
  A_email,
  A_comments_OSL,
  A_comments_ROOT,
  B_event_name,
  B_target_audience,
  B_event_schedule,
  B_expected_turnout,
  B_event_objective,
  B_comments_OSL,
  B_comments_ROOT,
  C1_date,
  C1_time,
  C1_activity_and_description,
  C1_venue,
  C2_date,
  C2_time,
  C2_activity_and_description,
  C2_venue,
  C3_date,
  C3_time,
  C3_activity_and_description,
  C3_venue,
  C3_cleanup_date,
  C3_cleanup_time,
  C3_cleanup_activity_and_description,
  C3_cleanup_venue,
  C_comments_OSL,
  C_comments_ROOT,
  D1A_club_income_fund,
  D1A_osl_seed_fund,
  D1A_donation,
  D1B_revenue,
  D1B_donation_or_scholarship,
  D1B_total_source_of_funds,
  D11_items_goods_services,
  D11_price,
  D11_quantity,
  D11_amount,
  D11_total_revenue,
  D2_items,
  D2_reason_for_purchase,
  D2_venue,
  D2_total_expenditure,
  D_comments_OSL,
  D_comments_ROOT,
  E_personal_data,
  E_comments_OSL,
  E_comments_ROOT,
  F_name,
  F_student_id,
  F_position,
  F_comments_OSL,
  F_comments_ROOT,
  G_1_1,
  G_1_2,
  G_1_3,
  G_2_1,
  G_2_2,
  G_2_3,
  G_3_1,
  G_3_2,
  G_3_3,
  G_4_1,
  G_4_2,
  G_4_3,
  G_5_1,
  G_5_2,
  G_5_3,
  G_6_1,
  G_6_2,
  G_6_3,
  G_7_1,
  G_7_2,
  G_7_3,
  G_comments_OSL,
  G_comments_ROOT,
  pool = db_pool
) {
  const columns = [
    { name: "status", value: status },
    { name: "exco_user_id", value: exco_user_id },
    { name: "a_name", value: A_name },
    { name: "a_student_id", value: A_student_id },
    { name: "a_organisation", value: A_organisation },
    { name: "a_contact_number", value: A_contact_number },
    { name: "a_email", value: A_email },
    { name: "a_comments_osl", value: A_comments_OSL },
    { name: "a_comments_root", value: A_comments_ROOT },
    { name: "b_event_name", value: B_event_name },
    { name: "b_target_audience", value: B_target_audience },
    { name: "b_event_schedule", value: B_event_schedule },
    { name: "b_expected_turnout", value: B_expected_turnout },
    { name: "b_event_objective", value: B_event_objective },
    { name: "b_comments_osl", value: B_comments_OSL },
    { name: "b_comments_root", value: B_comments_ROOT },
    { name: "c1_date", value: C1_date },
    { name: "c1_time", value: C1_time },
    { name: "c1_activity_and_description", value: C1_activity_and_description },
    { name: "c1_venue", value: C1_venue },
    { name: "c2_date", value: C2_date },
    { name: "c2_time", value: C2_time },
    { name: "c2_activity_and_description", value: C2_activity_and_description },
    { name: "c2_venue", value: C2_venue },
    { name: "c3_date", value: C3_date },
    { name: "c3_time", value: C3_time },
    { name: "c3_activity_and_description", value: C3_activity_and_description },
    { name: "c3_venue", value: C3_venue },
    { name: "c3_cleanup_date", value: C3_cleanup_date },
    { name: "c3_cleanup_time", value: C3_cleanup_time },
    {
      name: "c3_cleanup_activity_and_description",
      value: C3_cleanup_activity_and_description,
    },
    { name: "c3_cleanup_venue", value: C3_cleanup_venue },
    { name: "c_comments_osl", value: C_comments_OSL },
    { name: "c_comments_root", value: C_comments_ROOT },
    { name: "d1a_club_income_fund", value: D1A_club_income_fund },
    { name: "d1a_osl_seed_fund", value: D1A_osl_seed_fund },
    { name: "d1a_donation", value: D1A_donation },
    { name: "d1b_revenue", value: D1B_revenue },
    { name: "d1b_donation_or_scholarship", value: D1B_donation_or_scholarship },
    { name: "d1b_total_source_of_funds", value: D1B_total_source_of_funds },
    { name: "d11_items_goods_services", value: D11_items_goods_services },
    { name: "d11_price", value: D11_price },
    { name: "d11_quantity", value: D11_quantity },
    { name: "d11_amount", value: D11_amount },
    { name: "d11_total_revenue", value: D11_total_revenue },
    { name: "d2_items", value: D2_items },
    { name: "d2_reason_for_purchase", value: D2_reason_for_purchase },
    { name: "d2_venue", value: D2_venue },
    { name: "d2_total_expenditure", value: D2_total_expenditure },
    { name: "d_comments_osl", value: D_comments_OSL },
    { name: "d_comments_root", value: D_comments_ROOT },
    { name: "e_personal_data", value: E_personal_data },
    { name: "e_comments_osl", value: E_comments_OSL },
    { name: "e_comments_root", value: E_comments_ROOT },
    { name: "f_name", value: F_name },
    { name: "f_student_id", value: F_student_id },
    { name: "f_position", value: F_position },
    { name: "f_comments_osl", value: F_comments_OSL },
    { name: "f_comments_root", value: F_comments_ROOT },
    { name: "g_1_1", value: G_1_1 },
    { name: "g_1_2", value: G_1_2 },
    { name: "g_1_3", value: G_1_3 },
    { name: "g_2_1", value: G_2_1 },
    { name: "g_2_2", value: G_2_2 },
    { name: "g_2_3", value: G_2_3 },
    { name: "g_3_1", value: G_3_1 },
    { name: "g_3_2", value: G_3_2 },
    { name: "g_3_3", value: G_3_3 },
    { name: "g_4_1", value: G_4_1 },
    { name: "g_4_2", value: G_4_2 },
    { name: "g_4_3", value: G_4_3 },
    { name: "g_5_1", value: G_5_1 },
    { name: "g_5_2", value: G_5_2 },
    { name: "g_5_3", value: G_5_3 },
    { name: "g_6_1", value: G_6_1 },
    { name: "g_6_2", value: G_6_2 },
    { name: "g_6_3", value: G_6_3 },
    { name: "g_7_1", value: G_7_1 },
    { name: "g_7_2", value: G_7_2 },
    { name: "g_7_3", value: G_7_3 },
    { name: "g_comments_osl", value: G_comments_OSL },
    { name: "g_comments_root", value: G_comments_ROOT },
  ];

  const definedColumns = columns.filter((column) => column.value !== undefined);
  const columnNames = definedColumns.map((column) => column.name).join(",");
  const columnParams = definedColumns.map((_, i) => `$${i + 2}`).join(",");
  const defined_values = definedColumns.map((column) => column.value);

  const datatypes = Object.values(epf_db_datatypes_update);
  if (typeof epf_id !== datatypes[0]) {
    throw new Error("Unexpected data type");
  }

  for (let i = 0; i < columns.length; i++) {
    const { name, value } = columns[i];
    const expectedType = datatypes[i + 1];
    if (value !== undefined && typeof value !== expectedType) {
      throw new Error("Unexpected data type");
    }
  }

  //Status validation
  if (status !== undefined) {
    if (!status_types.includes(status)) {
      throw new Error("Invalid Status Type");
    }
  }

  const student_id_regex = /^1\d{6}$/;
  //Student ID validation
  if (A_student_id !== undefined) {
    if (!student_id_regex.test(A_student_id)) {
      throw new Error("Invalid Student ID");
    }
  }

  if (F_student_id !== undefined) {
    F_student_id.forEach((student_id) => {
      if (student_id !== "") {
        if (!student_id_regex.test(parseInt(student_id))) {
          throw new Error("Invalid Student ID");
        }
      }
    });
  }

  //Contact number validation
  if (A_contact_number !== undefined) {
    const contact_number_regex = /^[689]\d{7}$/;
    if (!contact_number_regex.test(A_contact_number)) {
      throw new Error("Invalid Contact Number");
    }
  }

  //Email format validation
  if (A_email !== undefined) {
    const [username, domain] = A_email.split("@");
    const isValidUsername = /^[^\s@]+$/;
    const isValidDomain = /^[^\s@]+\.[^\s@]+$/;
    if (
      !A_email.includes("@") ||
      !isValidUsername.test(username) ||
      !isValidDomain.test(domain)
    ) {
      throw new Error("Invalid email format");
    }
  }

  //Validation for money
  if (
    (D1A_club_income_fund < 0 && D1A_club_income_fund !== undefined) ||
    (D1A_osl_seed_fund < 0 && D1A_osl_seed_fund !== undefined) ||
    (D1A_donation < 0 && D1A_donation !== undefined) ||
    (D1B_revenue < 0 && D1B_revenue !== undefined) ||
    (D1B_donation_or_scholarship < 0 &&
      D1B_donation_or_scholarship !== undefined) ||
    (D1B_total_source_of_funds < 0 &&
      D1B_total_source_of_funds !== undefined) ||
    (D11_total_revenue < 0 && D11_total_revenue !== undefined) ||
    (D2_total_expenditure < 0 && D2_total_expenditure !== undefined)
  ) {
    throw new Error("Invalid value for money");
  }

  if (D11_price !== undefined) {
    D11_price.forEach((price) => {
      if (price !== "") {
        if (price < 0) {
          throw new Error("Invalid value for money");
        }
      }
    });
  }

  if (D11_amount !== undefined) {
    D11_amount.forEach((price) => {
      if (price !== "") {
        if (price < 0) {
          throw new Error("Invalid value for money");
        }
      }
    });
  }

  //Validation for Quantity
  if (D11_quantity !== undefined) {
    D11_quantity.forEach((price) => {
      if (price !== "") {
        if (price < 0) {
          throw new Error("Invalid quantity value");
        }
      }
    });
  }

  //Check for event name
  if (B_event_name !== undefined) {
    if (B_event_name.trim().length == 0) {
      throw new Error("Event name missing");
    }
  }

  //Validation for event schedule
  const datetime_regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (B_event_schedule !== undefined) {
    if (!datetime_regex.test(B_event_schedule)) {
      throw new Error("Invalid Datetime Format");
    }
  }

  //Validation for date
  const date_regex = /^\d{4}-\d{2}-\d{2}$/;
  if (C1_date !== undefined) {
    C1_date.forEach((date) => {
      if (date !== "") {
        if (!date_regex.test(date)) {
          throw new Error("Invalid Date Format");
        }
      }
    });
  }

  if (C2_date !== undefined) {
    C2_date.forEach((date) => {
      if (date !== "") {
        if (!date_regex.test(date)) {
          throw new Error("Invalid Date Format");
        }
      }
    });
  }

  if (C3_date !== undefined) {
    C3_date.forEach((date) => {
      if (date !== "") {
        if (!date_regex.test(date)) {
          throw new Error("Invalid Date Format");
        }
      }
    });
  }

  if (C3_cleanup_date) {
    C3_cleanup_date.forEach((date) => {
      if (date !== "") {
        if (!date_regex.test(date)) {
          throw new Error("Invalid Date Format");
        }
      }
    });
  }

  //Validation for time
  const time_regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  if (C1_time !== undefined) {
    C1_time.forEach((time) => {
      if (time !== "") {
        if (!time_regex.test(time)) {
          throw new Error("Invalid Time Format");
        }
      }
    });
  }

  if (C2_time !== undefined) {
    C2_time.forEach((time) => {
      if (time !== "") {
        if (!time_regex.test(time)) {
          throw new Error("Invalid Time Format");
        }
      }
    });
  }

  if (C3_time !== undefined) {
    C3_time.forEach((time) => {
      if (time !== "") {
        if (!time_regex.test(time)) {
          throw new Error("Invalid Time Format");
        }
      }
    });
  }

  if (C3_cleanup_time !== undefined) {
    C3_cleanup_time.forEach((time) => {
      if (time !== "") {
        if (!time_regex.test(time)) {
          throw new Error("Invalid Time Format");
        }
      }
    });
  }

  let client;
  let result = null;
  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid epf_id and exco_user_id
      const idsToCheck = {
        epf_id: ["EPFS", "epf_id", epf_id],
        exco_user_id: ["users", "user_id", exco_user_id],
      };

      for (let id in idsToCheck) {
        const res = await client.query(
          `SELECT COUNT(*) FROM ${idsToCheck[id][0]} WHERE ${idsToCheck[id][1]}=$1 AND is_deleted = false`,
          [idsToCheck[id][2]]
        );
        if (res.rows[0]["count"] == 0) {
          throw new Error(`Non-existent ${id}`);
        }
      }
      const query = `UPDATE EPFS SET (${columnNames}) = (${columnParams}) WHERE epf_id=$1 AND is_deleted = false RETURNING *`;
      result = await client.query(query, [epf_id, ...defined_values]);
      await update_outstanding_EPF_count(client);
      await client.query("COMMIT");
      break;
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        !(
          err.message.includes("could not serialize access") ||
          err.message.includes("deadlock detected")
        )
      ) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max update attempts exceeded");
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  return result.rows[0];
}

export async function deleteEPF(epf_id, pool = db_pool) {
  // Check for epf_id data type
  if (typeof epf_id !== "number") {
    throw new Error("Unexpected data type");
  }

  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid epf_id
      const valid_epf_id = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE epf_id=$1 AND is_deleted = false`,
        [epf_id]
      );
      if (valid_epf_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent epf");
      }

      const query =
        "UPDATE EPFS SET is_deleted = true WHERE epf_id = $1 AND is_deleted = false RETURNING epf_id";
      result = await client.query(query, [epf_id]);
      await client.query(
        `UPDATE FILES SET is_deleted = true WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );
      await update_outstanding_EPF_count(client);
      await client.query("COMMIT");
      break; // Breaks the loop if the transaction is successful
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        !err.message.includes("could not serialize access") &&
        !err.message.includes("deadlock detected")
      ) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max delete attempts exceeded");
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  return result.rows[0];
}
