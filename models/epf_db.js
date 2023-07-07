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

  const values = [
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
    G_comments,
  ];
  const query = `INSERT INTO EPFS (${column_names}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69 $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84, $85, $86, $87, $88, $89);`;
  await pool.query(query, values);
  await pool.end();
}

export async function getEPF(epf_id) {
  const pool = new Pool(credentials);
  const values = [epf_id];
  const result = await pool.query(`SELECT * FROM EPFS WHERE epf_id=$1`, values);
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
  const values = [
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
    G_comments,
    epf_id,
  ];
  const query = `UPDATE EPFS SET status=$1, user_id=$2, A_name=$3, ...[more parameters here]..., G_7_3=$87, G_comments=$88 WHERE epf_id=$89`;
  await pool.query(query, values);
  await pool.end();
}

export async function deleteEPF(epf_id) {
  const pool = new Pool(credentials);
  const values = [epf_id];
  const query = `DELETE FROM EPFS WHERE epf_id=$1`;
  await pool.query(query, values);
  await pool.end();
}
