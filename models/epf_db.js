/*
Logic for EPF DB
*/
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export async function count_outstanding_EPF() {
  const pool = new Pool(credentials);
  const result = await pool.query(
    `SELECT COUNT(*) FROM EPFS WHERE status != $1`,
    ["Approved"]
  );
  await pool.query(`UPDATE EXCO SET outstanding_epf=$1`, [
    result["rows"][0]["count"],
  ]);

  await pool.query(`UPDATE OSL SET outstanding_epf=$1`, [
    result["rows"][0]["count"],
  ]);

  await pool.query(`UPDATE ROOT SET outstanding_epf=$1`, [
    result["rows"][0]["count"],
  ]);

  await pool.end();

  //for testing
  return result["rows"][0]["count"];
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
  G_comments_ROOT
) {
  const pool = new Pool(credentials);
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

  const query = `INSERT INTO EPFS(${column_names}) VALUES (${columnParams}) RETURNING epf_id`;
  const new_epf_id = await pool.query(query, values);
  await pool.end();
  return new_epf_id["rows"][0]["epf_id"];
}

export async function getEPF(epf_id) {
  const pool = new Pool(credentials);
  const result = await pool.query("SELECT * FROM EPFS WHERE epf_id=$1", [
    epf_id,
  ]);
  await pool.end();
  if (result.rowCount === 0) {
    return null;
  }
  return result["rows"];
}

export async function getEPFs() {
  const pool = new Pool(credentials);
  const result = await pool.query(`SELECT * FROM EPFS`);
  await pool.end();
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
  G_comments_ROOT
) {
  const pool = new Pool(credentials);
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

  const query = `UPDATE EPFS SET (${columnNames}) = (${columnParams}) WHERE epf_id=$1`;
  let result = await pool.query(query, values);
  await pool.end();
  return result.rowCount;
}

export async function deleteEPF(epf_id) {
  const pool = new Pool(credentials);
  const query = "DELETE FROM EPFS WHERE epf_id=$1";
  const result = await pool.query(query, [epf_id]);
  await pool.end();
  return result.rowCount;
}

export async function getEPFbyAttrbute(attributes) {
  const pool = new Pool(credentials);

  const keys = Object.keys(attributes).filter((key) => key !== "sort");

  // Check for required properties in attribute objects
  for (const key of keys) {
    if (
      !attributes[key].hasOwnProperty("value") ||
      !attributes[key].hasOwnProperty("operator")
    ) {
      throw new Error(
        `Attribute "${key}" must have "value" and "operator" properties`
      );
    }
  }

  const conditions = keys.map(
    (key, index) => `${key}${attributes[key].operator}$${index + 1}`
  );

  const values = keys.map((key) => attributes[key].value);

  let query = `SELECT * FROM EPFS WHERE ${conditions.join(" AND ")}`;

  if (attributes.sort) {
    // Additional check for required properties in "sort" attribute
    if (
      !attributes.sort.hasOwnProperty("column") ||
      !attributes.sort.hasOwnProperty("direction")
    ) {
      throw new Error(
        `Sort property must have "column" and "direction" properties`
      );
    }
    query += ` ORDER BY ${attributes.sort.column} ${attributes.sort.direction}`;
  }

  const result = await pool.query(query, values);

  await pool.end();

  if (result.rowCount === 0) {
    return null;
  }

  return result["rows"];
}
