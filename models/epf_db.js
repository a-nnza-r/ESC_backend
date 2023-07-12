/*
Logic for EPF DB
*/
import pg from 'pg'
const {Pool} = pg

const credentials = {
    host: '127.0.0.1',
    user: 'postgres',
    port: 5432,
    password: '123',
    database: 'esc_db'
}

export async function count_outstanding_EPF() {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT COUNT(*) FROM EPFS WHERE status !='Approved'`)

    await pool.query(`UPDATE EXCO SET outstanding_epf='${result["rows"][0]["count"]}';`)
    await pool.end()

    //for testing
    return result["rows"][0]["count"]
}


export async function createEPF(
    status, exco_user_id,
    A_name, A_student_id, A_organisation, A_contact_number, A_email, A_comments_OSL, A_comments_ROOT,
    B_event_name, B_target_audience, B_event_schedule, B_expected_turnout, B_event_objective, B_comments_OSL, B_comments_ROOT,
    C1_date, C1_time, C1_activity_and_description, C1_venue,
    C2_date, C2_time, C2_activity_and_description, C2_venue,
    C3_date, C3_time, C3_activity_and_description, C3_venue,
    C3_cleanup_date, C3_cleanup_time, C3_cleanup_activity_and_description, C3_cleanup_venue, C_comments_OSL, C_comments_ROOT,
    D1A_club_income_fund, D1A_osl_seed_fund, D1A_donation, D1B_revenue, D1B_donation_or_scholarship, D1B_total_source_of_funds,
    D11_items_goods_services, D11_price, D11_quantity, D11_amount, D11_total_revenue,
    D2_items, D2_reason_for_purchase, D2_venue, D2_total_expenditure, D_comments_OSL, D_comments_ROOT,
    E_personal_data, E_comments_OSL, E_comments_ROOT,
    F_name, F_student_id, F_position, F_comments_OSL, F_comments_ROOT,
    G_1_1, G_1_2, G_1_3,
    G_2_1, G_2_2, G_2_3,
    G_3_1, G_3_2, G_3_3,
    G_4_1, G_4_2, G_4_3,
    G_5_1, G_5_2, G_5_3,
    G_6_1, G_6_2, G_6_3,
    G_7_1, G_7_2, G_7_3, G_comments_OSL, G_comments_ROOT
    ) 
    {
    const pool = new Pool(credentials)
    const metadata = "status,exco_user_id,"
    const sectionA = "A_name,A_student_id,A_organisation,A_contact_number,A_email,A_comments_OSL,A_comments_ROOT,"
    const sectionB = "B_event_name,B_target_audience,B_event_schedule,B_expected_turnout,B_event_objective,B_comments_OSL,B_comments_ROOT,"
    const sectionC1 = "C1_date,C1_time,C1_activity_and_description,C1_venue,"
    const sectionC2 = "C2_date,C2_time,C2_activity_and_description,C2_venue,"
    const sectionC3 = "C3_date,C3_time,C3_activity_and_description,C3_venue,"
    const sectionC3Cleanup = "C3_cleanup_date,C3_cleanup_time,C3_cleanup_activity_and_description,C3_cleanup_venue,C_comments_OSL,C_comments_ROOT,"
    const sectionD1 = "D1A_club_income_fund,D1A_osl_seed_fund,D1A_donation,D1B_revenue,D1B_donation_or_scholarship,D1B_total_source_of_funds,"
    const sectionD11 = "D11_items_goods_services,D11_price,D11_quantity,D11_amount,D11_total_revenue,"
    const sectionD2 = "D2_items,D2_reason_for_purchase,D2_venue,D2_total_expenditure,D_comments_OSL,D_comments_ROOT,"
    const sectionE = "E_personal_data,E_comments_OSL,E_comments_ROOT,"
    const sectionF = "F_name,F_student_id,F_position,F_comments_OSL,F_comments_ROOT,"
    const sectionG1 = "G_1_1,G_1_2,G_1_3,"
    const sectionG2 = "G_2_1,G_2_2,G_2_3,"
    const sectionG3 = "G_3_1,G_3_2,G_3_3,"
    const sectionG4 = "G_4_1,G_4_2,G_4_3,"
    const sectionG5 = "G_5_1,G_5_2,G_5_3,"
    const sectionG6 = "G_6_1,G_6_2,G_6_3,"
    const sectionG7 = "G_7_1,G_7_2,G_7_3,G_comments_OSL,G_comments_ROOT"

    const column_names = metadata.concat(sectionA,sectionB,sectionC1,sectionC2,sectionC3,sectionC3Cleanup,sectionD1,sectionD11,sectionD2,sectionE,sectionF,sectionG1,sectionG2,sectionG3,sectionG4,sectionG5,sectionG6,sectionG7)
    const query = `INSERT INTO EPFS (${column_names}) VALUES ('${status}', ${exco_user_id},'${A_name}', ${A_student_id}, '${A_organisation}', ${A_contact_number}, '${A_email}', '${A_comments_OSL}', '${A_comments_ROOT}', '${B_event_name}', '${B_target_audience}', '${B_event_schedule}', ${B_expected_turnout}, '${B_event_objective}', '${B_comments_OSL}', '${B_comments_ROOT}', ARRAY ${C1_date}, ARRAY ${C1_time}, ARRAY ${C1_activity_and_description}, ARRAY ${C1_venue},ARRAY ${C2_date}, ARRAY ${C2_time}, ARRAY ${C2_activity_and_description}, ARRAY ${C2_venue},ARRAY ${C3_date}, ARRAY ${C3_time}, ARRAY ${C3_activity_and_description}, ARRAY ${C3_venue},ARRAY ${C3_cleanup_date}, ARRAY ${C3_cleanup_time}, ARRAY ${C3_cleanup_activity_and_description}, ARRAY ${C3_cleanup_venue}, '${C_comments_OSL}', '${C_comments_ROOT}', ${D1A_club_income_fund}, ${D1A_osl_seed_fund}, ${D1A_donation}, ${D1B_revenue}, ${D1B_donation_or_scholarship}, ${D1B_total_source_of_funds},ARRAY ${D11_items_goods_services}, ARRAY ${D11_price}, ARRAY ${D11_quantity}, ARRAY ${D11_amount}, ${D11_total_revenue},ARRAY ${D2_items}, ARRAY ${D2_reason_for_purchase}, ARRAY ${D2_venue}, ${D2_total_expenditure}, '${D_comments_OSL}', '${D_comments_ROOT}', ${E_personal_data}, '${E_comments_OSL}', '${E_comments_ROOT}', ARRAY ${F_name}, ARRAY ${F_student_id}, ARRAY ${F_position}, '${F_comments_OSL}','${F_comments_ROOT}','${G_1_1}', '${G_1_2}', '${G_1_3}','${G_2_1}', '${G_2_2}', '${G_2_3}','${G_3_1}', '${G_3_2}', '${G_3_3}','${G_4_1}', '${G_4_2}', '${G_4_3}','${G_5_1}', '${G_5_2}', '${G_5_3}','${G_6_1}', '${G_6_2}', '${G_6_3}','${G_7_1}', '${G_7_2}', '${G_7_3}', '${G_comments_OSL}','${G_comments_ROOT}');`
    await pool.query(query)
    await pool.end()
}


export async function getEPF(epf_id) {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EPFS WHERE epf_id=${epf_id}`)
    await pool.end()
    return result["rows"]
}

export async function getEPFs() {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EPFS`)
    await pool.end()
    return result["rows"]
}


export async function updateEPF(
    epf_id, status, exco_user_id,
    A_name, A_student_id, A_organisation, A_contact_number, A_email, A_comments_OSL, A_comments_ROOT,
    B_event_name, B_target_audience, B_event_schedule, B_expected_turnout, B_event_objective, B_comments_OSL, B_comments_ROOT,
    C1_date, C1_time, C1_activity_and_description, C1_venue,
    C2_date, C2_time, C2_activity_and_description, C2_venue,
    C3_date, C3_time, C3_activity_and_description, C3_venue,
    C3_cleanup_date, C3_cleanup_time, C3_cleanup_activity_and_description, C3_cleanup_venue, C_comments_OSL, C_comments_ROOT,
    D1A_club_income_fund, D1A_osl_seed_fund, D1A_donation, D1B_revenue, D1B_donation_or_scholarship, D1B_total_source_of_funds,
    D11_items_goods_services, D11_price, D11_quantity, D11_amount, D11_total_revenue,
    D2_items, D2_reason_for_purchase, D2_venue, D2_total_expenditure, D_comments_OSL, D_comments_ROOT,
    E_personal_data, E_comments_OSL, E_comments_ROOT,
    F_name, F_student_id, F_position, F_comments_OSL, F_comments_ROOT,
    G_1_1, G_1_2, G_1_3,
    G_2_1, G_2_2, G_2_3,
    G_3_1, G_3_2, G_3_3,
    G_4_1, G_4_2, G_4_3,
    G_5_1, G_5_2, G_5_3,
    G_6_1, G_6_2, G_6_3,
    G_7_1, G_7_2, G_7_3, G_comments_OSL, G_comments_ROOT
    ) 
    {
    const pool = new Pool(credentials)
    const query = `UPDATE EPFS SET status='${status}', exco_user_id=${exco_user_id}, A_name='${A_name}', A_student_id=${A_student_id}, A_organisation='${A_organisation}', A_contact_number=${A_contact_number}, A_email='${A_email}', A_comments_OSL='${A_comments_OSL}', A_comments_ROOT='${A_comments_ROOT}', B_event_name='${B_event_name}', B_target_audience='${B_target_audience}', B_event_schedule='${B_event_schedule}', B_expected_turnout=${B_expected_turnout}, B_event_objective='${B_event_objective}', B_comments_OSL='${B_comments_OSL}',B_comments_ROOT='${B_comments_ROOT}', C1_date=ARRAY ${C1_date}, C1_time=ARRAY ${C1_time}, C1_activity_and_description=ARRAY ${C1_activity_and_description}, C1_venue=ARRAY ${C1_venue},C2_date=ARRAY ${C2_date}, C2_time=ARRAY ${C2_time}, C2_activity_and_description=ARRAY ${C2_activity_and_description}, C2_venue=ARRAY ${C2_venue},C3_date=ARRAY ${C3_date}, C3_time=ARRAY ${C3_time}, C3_activity_and_description=ARRAY ${C3_activity_and_description}, C3_venue=ARRAY ${C3_venue},C3_cleanup_date=ARRAY ${C3_cleanup_date}, C3_cleanup_time=ARRAY ${C3_cleanup_time}, C3_cleanup_activity_and_description=ARRAY ${C3_cleanup_activity_and_description}, C3_cleanup_venue=ARRAY ${C3_cleanup_venue}, C_comments_OSL='${C_comments_OSL}', C_comments_ROOT='${C_comments_ROOT}', D1A_club_income_fund=${D1A_club_income_fund}, D1A_osl_seed_fund=${D1A_osl_seed_fund}, D1A_donation=${D1A_donation}, D1B_revenue=${D1B_revenue}, D1B_donation_or_scholarship=${D1B_donation_or_scholarship}, D1B_total_source_of_funds=${D1B_total_source_of_funds},D11_items_goods_services=ARRAY ${D11_items_goods_services}, D11_price=ARRAY ${D11_price}, D11_quantity=ARRAY ${D11_quantity}, D11_amount=ARRAY ${D11_amount}, D11_total_revenue=${D11_total_revenue},D2_items=ARRAY ${D2_items}, D2_reason_for_purchase=ARRAY ${D2_reason_for_purchase}, D2_venue=ARRAY ${D2_venue}, D2_total_expenditure=${D2_total_expenditure}, D_comments_OSL='${D_comments_OSL}', D_comments_ROOT='${D_comments_ROOT}', E_personal_data=${E_personal_data}, E_comments_OSL='${E_comments_OSL}', E_comments_ROOT='${E_comments_ROOT}', F_name=ARRAY ${F_name}, F_student_id=ARRAY ${F_student_id}, F_position=ARRAY ${F_position}, F_comments_OSL = '${F_comments_OSL}', F_comments_ROOT = '${F_comments_ROOT}', G_1_1='${G_1_1}', G_1_2='${G_1_2}', G_1_3='${G_1_3}',G_2_1='${G_2_1}', G_2_2='${G_2_2}', G_2_3='${G_2_3}',G_3_1='${G_3_1}', G_3_2='${G_3_2}', G_3_3='${G_3_3}',G_4_1='${G_4_1}', G_4_2='${G_4_2}', G_4_3='${G_4_3}',G_5_1='${G_5_1}', G_5_2='${G_5_2}', G_5_3='${G_5_3}',G_6_1='${G_6_1}', G_6_2='${G_6_2}', G_6_3='${G_6_3}',G_7_1='${G_7_1}', G_7_2='${G_7_2}', G_7_3='${G_7_3}', G_comments_OSL='${G_comments_OSL}', G_comments_ROOT='${G_comments_ROOT}' WHERE epf_id=${epf_id};`
    await pool.query(query)
    await pool.end()
}

export async function deleteEPF(epf_id) {
    const pool = new Pool(credentials)
    const query = `DELETE FROM EPFS WHERE epf_id=${epf_id};`
    await pool.query(query)
    await pool.end()
}

