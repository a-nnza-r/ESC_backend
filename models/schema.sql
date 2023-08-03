CREATE DATABASE esc_db;

CREATE DATABASE esc_db_test;

CREATE TABLE users(
    user_id VARCHAR PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    user_type VARCHAR NOT NULL,
    outstanding_epf INT,
    is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE epfs (
    epf_id SERIAL PRIMARY KEY,
    status VARCHAR, 
    exco_user_id VARCHAR,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    a_name VARCHAR,
    a_student_id INT,
    a_organisation VARCHAR,
    a_contact_number INT,
    a_email VARCHAR,
    a_comments_osl VARCHAR,
    a_comments_root VARCHAR,

    b_event_name VARCHAR,
    b_target_audience VARCHAR,
    b_event_schedule VARCHAR,
    b_expected_turnout INT,
    b_event_objective VARCHAR,
    b_comments_osl VARCHAR,
    b_comments_root VARCHAR,

    c1_date TEXT[],
    c1_time TEXT[],
    c1_activity_and_description TEXT[],
    c1_venue TEXT[],

    c2_date TEXT[],
    c2_time TEXT[],
    c2_activity_and_description TEXT[],
    c2_venue TEXT[],

    c3_date TEXT[],
    c3_time TEXT[],
    c3_activity_and_description TEXT[],
    c3_venue TEXT[],

    c3_cleanup_date TEXT[],
    c3_cleanup_time TEXT[],
    c3_cleanup_activity_and_description TEXT[],
    c3_cleanup_venue TEXT[],
    c_comments_osl VARCHAR,
    c_comments_root VARCHAR,

    d1a_club_income_fund DECIMAL(10,2),
    d1a_osl_seed_fund DECIMAL(10,2),
    d1a_donation DECIMAL(10,2),
    d1b_revenue DECIMAL(10,2),
    d1b_donation_or_scholarship DECIMAL(10,2),
    d1b_total_source_of_funds DECIMAL(10,2),

    d11_items_goods_services TEXT[],
    d11_price TEXT[],
    d11_quantity TEXT[],
    d11_amount TEXT[],
    d11_total_revenue DECIMAL(10,2),

    d2_items TEXT[],
    d2_reason_for_purchase TEXT[],
    d2_venue TEXT[],
    d2_total_expenditure DECIMAL(10,2),
    d_comments_osl VARCHAR,
    d_comments_root VARCHAR,

    e_personal_data INT,
    e_comments_osl VARCHAR,
    e_comments_root VARCHAR,

    f_name TEXT[],
    f_student_id TEXT[],
    f_position TEXT[],
    f_comments_osl VARCHAR,
    f_comments_root VARCHAR,

    g_1_1 VARCHAR,
    g_1_2 VARCHAR,
    g_1_3 VARCHAR,
    
    g_2_1 VARCHAR,
    g_2_2 VARCHAR,
    g_2_3 VARCHAR,

    g_3_1 VARCHAR,
    g_3_2 VARCHAR,
    g_3_3 VARCHAR,

    g_4_1 VARCHAR,
    g_4_2 VARCHAR,
    g_4_3 VARCHAR,

    g_5_1 VARCHAR,
    g_5_2 VARCHAR,
    g_5_3 VARCHAR,

    g_6_1 VARCHAR,
    g_6_2 VARCHAR,
    g_6_3 VARCHAR,

    g_7_1 VARCHAR,
    g_7_2 VARCHAR,
    g_7_3 VARCHAR,
    g_comments_osl VARCHAR,
    g_comments_root VARCHAR,

    is_deleted BOOLEAN DEFAULT false,

    CONSTRAINT fk_exco
        FOREIGN KEY(exco_user_id)
            REFERENCES users(user_id) 
);

CREATE TABLE FILES (
    file_id SERIAL PRIMARY KEY,
    epf_id INT NOT NULL,
    file_name VARCHAR NOT NULL,
    file_data BYTEA NOT NULL,

    is_deleted BOOLEAN DEFAULT false,

    CONSTRAINT fk_epf
        FOREIGN KEY(epf_id)
            REFERENCES EPFS(epf_id) 
);






