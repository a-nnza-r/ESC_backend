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
  const values = [
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
    if (typeof values[i] !== datatypes[i]) {
      throw new Error("Unexpected data type");
    }
  }
  //Check for event name
  if (B_event_name.trim().length == 0) {
    throw new Error("Event name missing");
  }

  let client;
  let result = null;
  let epf_count = null;
  let retryCount = 5;
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
  const columnNames =
    "status,exco_user_id,a_name,a_student_id,a_organisation,a_contact_number,a_email,a_comments_osl,a_comments_root,b_event_name,b_target_audience,b_event_schedule,b_expected_turnout,b_event_objective,b_comments_osl,b_comments_root,c1_date,c1_time,c1_activity_and_description,c1_venue,c2_date,c2_time,c2_activity_and_description,c2_venue,c3_date,c3_time,c3_activity_and_description,c3_venue,c3_cleanup_date,c3_cleanup_time,c3_cleanup_activity_and_description,c3_cleanup_venue,c_comments_osl,c_comments_root,d1a_club_income_fund,d1a_osl_seed_fund,d1a_donation,d1b_revenue,d1b_donation_or_scholarship,d1b_total_source_of_funds,d11_items_goods_services,d11_price,d11_quantity,d11_amount,d11_total_revenue,d2_items,d2_reason_for_purchase,d2_venue,d2_total_expenditure,d_comments_osl,d_comments_root,e_personal_data,e_comments_osl,e_comments_root,f_name,f_student_id,f_position,f_comments_osl,f_comments_root,g_1_1,g_1_2,g_1_3,g_2_1,g_2_2,g_2_3,g_3_1,g_3_2,g_3_3,g_4_1,g_4_2,g_4_3,g_5_1,g_5_2,g_5_3,g_6_1,g_6_2,g_6_3,g_7_1,g_7_2,g_7_3,g_comments_osl,g_comments_root";
  const columnParams = columnNames
    .split(",")
    .map((_, i) => `$${i + 2}`)
    .join(",");
  const values = [
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
  ];

  //Check for datatypes
  const datatypes = Object.values(epf_db_datatypes_update);

  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] !== datatypes[i]) {
      throw new Error("Unexpected data type");
    }
  }

  //Check for event name
  if (B_event_name.trim().length == 0) {
    throw new Error("Event name missing");
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
          `SELECT COUNT(*) FROM ${idsToCheck[id][0]} WHERE ${idsToCheck[id][1]}=$1`,
          [idsToCheck[id][2]]
        );
        if (res.rows[0]["count"] == 0) {
          throw new Error(`Non-existent ${id}`);
        }
      }
      const query = `UPDATE EPFS SET (${columnNames}) = (${columnParams}) WHERE epf_id=$1 AND is_deleted = false RETURNING *`;
      result = await client.query(query, values);
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
