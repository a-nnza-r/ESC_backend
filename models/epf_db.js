/*
Logic for EPF DB
*/
import pg from "pg";
const { Pool } = pg;
import { loadConfig } from "../configLoader.js";
await loadConfig();

const credentials = {
  host: "127.0.0.1",
  user: process.env.DB_USER,
  port: process.env.POSTGRESPORT,
  password: process.env.DB_PASSWORD,
  database: "esc_db",
};

export async function createEPF(
  status,
  user_id,
  A_name,
  A_student_id,
  A_organisation,
  A_contact_number,
  A_email,
  A_comments,
  B_event_name,
  B_target_audience,
  B_event_schedule,
  B_expected_turnout,
  B_event_objective,
  B_comments,
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
  C_comments,
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
  D_comments,
  E_personal_data,
  E_comments,
  F_name,
  F_student_id,
  F_position,
  F_comments,
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
  G_comments
) {
  const pool = new Pool(credentials);
  const metadata = "status,user_id,";
  const sectionA =
    "A_name,A_student_id,A_organisation,A_contact_number,A_email,A_comments,";
  const sectionB =
    "B_event_name,B_target_audience,B_event_schedule,B_expected_turnout,B_event_objective,B_comments,";
  const sectionC1 = "C1_date,C1_time,C1_activity_and_description,C1_venue,";
  const sectionC2 = "C2_date,C2_time,C2_activity_and_description,C2_venue,";
  const sectionC3 = "C3_date,C3_time,C3_activity_and_description,C3_venue,";
  const sectionC3Cleanup =
    "C3_cleanup_date,C3_cleanup_time,C3_cleanup_activity_and_description,C3_cleanup_venue,C_comments,";
  const sectionD1 =
    "D1A_club_income_fund,D1A_osl_seed_fund,D1A_donation,D1B_revenue,D1B_donation_or_scholarship,D1B_total_source_of_funds,";
  const sectionD11 =
    "D11_items_goods_services,D11_price,D11_quantity,D11_amount,D11_total_revenue,";
  const sectionD2 =
    "D2_items,D2_reason_for_purchase,D2_venue,D2_total_expenditure,D_comments,";
  const sectionE = "E_personal_data,E_comments,";
  const sectionF = "F_name,F_student_id,F_position,F_comments,";
  const sectionG1 = "G_1_1,G_1_2,G_1_3,";
  const sectionG2 = "G_2_1,G_2_2,G_2_3,";
  const sectionG3 = "G_3_1,G_3_2,G_3_3,";
  const sectionG4 = "G_4_1,G_4_2,G_4_3,";
  const sectionG5 = "G_5_1,G_5_2,G_5_3,";
  const sectionG6 = "G_6_1,G_6_2,G_6_3,";
  const sectionG7 = "G_7_1,G_7_2,G_7_3,G_comments";

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
  const query = `INSERT INTO EPFS (${column_names}) VALUES ('${status}', ${user_id},'${A_name}', ${A_student_id}, '${A_organisation}', ${A_contact_number}, '${A_email}', '${A_comments}', '${B_event_name}', '${B_target_audience}', '${B_event_schedule}', ${B_expected_turnout}, '${B_event_objective}', '${B_comments}', ARRAY ${C1_date}, ARRAY ${C1_time}, ARRAY ${C1_activity_and_description}, ARRAY ${C1_venue},ARRAY ${C2_date}, ARRAY ${C2_time}, ARRAY ${C2_activity_and_description}, ARRAY ${C2_venue},ARRAY ${C3_date}, ARRAY ${C3_time}, ARRAY ${C3_activity_and_description}, ARRAY ${C3_venue},ARRAY ${C3_cleanup_date}, ARRAY ${C3_cleanup_time}, ARRAY ${C3_cleanup_activity_and_description}, ARRAY ${C3_cleanup_venue}, '${C_comments}', ${D1A_club_income_fund}, ${D1A_osl_seed_fund}, ${D1A_donation}, ${D1B_revenue}, ${D1B_donation_or_scholarship}, ${D1B_total_source_of_funds},ARRAY ${D11_items_goods_services}, ARRAY ${D11_price}, ARRAY ${D11_quantity}, ARRAY ${D11_amount}, ${D11_total_revenue},ARRAY ${D2_items}, ARRAY ${D2_reason_for_purchase}, ARRAY ${D2_venue}, ${D2_total_expenditure}, '${D_comments}', ${E_personal_data}, '${E_comments}', ARRAY ${F_name}, ARRAY ${F_student_id}, ARRAY ${F_position}, '${F_comments}','${G_1_1}', '${G_1_2}', '${G_1_3}','${G_2_1}', '${G_2_2}', '${G_2_3}','${G_3_1}', '${G_3_2}', '${G_3_3}','${G_4_1}', '${G_4_2}', '${G_4_3}','${G_5_1}', '${G_5_2}', '${G_5_3}','${G_6_1}', '${G_6_2}', '${G_6_3}','${G_7_1}', '${G_7_2}', '${G_7_3}', '${G_comments}');`;
  await pool.query(query);
  await pool.end();
}

export async function getEPF(epf_id) {
  const pool = new Pool(credentials);
  const result = await pool.query(`SELECT * FROM EPFS WHERE epf_id=${epf_id}`);
  await pool.end();
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
  user_id,
  A_name,
  A_student_id,
  A_organisation,
  A_contact_number,
  A_email,
  A_comments,
  B_event_name,
  B_target_audience,
  B_event_schedule,
  B_expected_turnout,
  B_event_objective,
  B_comments,
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
  C_comments,
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
  D_comments,
  E_personal_data,
  E_comments,
  F_name,
  F_student_id,
  F_position,
  F_comments,
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
  G_comments
) {
  const pool = new Pool(credentials);
  const query = `UPDATE EPFS SET status='${status}', user_id=${user_id}, A_name='${A_name}', A_student_id=${A_student_id}, A_organisation='${A_organisation}', A_contact_number=${A_contact_number}, A_email='${A_email}', A_comments='${A_comments}', B_event_name='${B_event_name}', B_target_audience='${B_target_audience}', B_event_schedule='${B_event_schedule}', B_expected_turnout=${B_expected_turnout}, B_event_objective='${B_event_objective}', B_comments='${B_comments}', C1_date=ARRAY ${C1_date}, C1_time=ARRAY ${C1_time}, C1_activity_and_description=ARRAY ${C1_activity_and_description}, C1_venue=ARRAY ${C1_venue},C2_date=ARRAY ${C2_date}, C2_time=ARRAY ${C2_time}, C2_activity_and_description=ARRAY ${C2_activity_and_description}, C2_venue=ARRAY ${C2_venue},C3_date=ARRAY ${C3_date}, C3_time=ARRAY ${C3_time}, C3_activity_and_description=ARRAY ${C3_activity_and_description}, C3_venue=ARRAY ${C3_venue},C3_cleanup_date=ARRAY ${C3_cleanup_date}, C3_cleanup_time=ARRAY ${C3_cleanup_time}, C3_cleanup_activity_and_description=ARRAY ${C3_cleanup_activity_and_description}, C3_cleanup_venue=ARRAY ${C3_cleanup_venue}, C_comments='${C_comments}', D1A_club_income_fund=${D1A_club_income_fund}, D1A_osl_seed_fund=${D1A_osl_seed_fund}, D1A_donation=${D1A_donation}, D1B_revenue=${D1B_revenue}, D1B_donation_or_scholarship=${D1B_donation_or_scholarship}, D1B_total_source_of_funds=${D1B_total_source_of_funds},D11_items_goods_services=ARRAY ${D11_items_goods_services}, D11_price=ARRAY ${D11_price}, D11_quantity=ARRAY ${D11_quantity}, D11_amount=ARRAY ${D11_amount}, D11_total_revenue=${D11_total_revenue},D2_items=ARRAY ${D2_items}, D2_reason_for_purchase=ARRAY ${D2_reason_for_purchase}, D2_venue=ARRAY ${D2_venue}, D2_total_expenditure=${D2_total_expenditure}, D_comments='${D_comments}', E_personal_data=${E_personal_data},E_comments='${E_comments}',F_name=ARRAY ${F_name}, F_student_id=ARRAY ${F_student_id}, F_position=ARRAY ${F_position}, F_comments = '${F_comments}', G_1_1='${G_1_1}', G_1_2='${G_1_2}', G_1_3='${G_1_3}',G_2_1='${G_2_1}', G_2_2='${G_2_2}', G_2_3='${G_2_3}',G_3_1='${G_3_1}', G_3_2='${G_3_2}', G_3_3='${G_3_3}',G_4_1='${G_4_1}', G_4_2='${G_4_2}', G_4_3='${G_4_3}',G_5_1='${G_5_1}', G_5_2='${G_5_2}', G_5_3='${G_5_3}',G_6_1='${G_6_1}', G_6_2='${G_6_2}', G_6_3='${G_6_3}',G_7_1='${G_7_1}', G_7_2='${G_7_2}', G_7_3='${G_7_3}', G_comments='${G_comments}' WHERE epf_id=${epf_id};`;
  await pool.query(query);
  await pool.end();
}

export async function deleteEPF(epf_id) {
  const pool = new Pool(credentials);
  const query = `DELETE FROM EPFS WHERE epf_id=${epf_id};`;
  await pool.query(query);
  await pool.end();
}
