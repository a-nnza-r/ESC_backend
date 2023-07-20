CREATE DATABASE esc_db;

CREATE TABLE EXCO (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    outstanding_epf INT 
);

CREATE TABLE OSL (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    outstanding_epf INT 
);

CREATE TABLE ROOT (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    outstanding_epf INT 
);

CREATE TABLE epfs (
    epf_id SERIAL PRIMARY KEY,
    status VARCHAR(50), 
    exco_user_id INT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    a_name VARCHAR(50),
    a_student_id INT,
    a_organisation VARCHAR(50),
    a_contact_number INT,
    a_email VARCHAR(50),
    a_comments_osl VARCHAR(50),
    a_comments_root VARCHAR(50),

    b_event_name VARCHAR(50),
    b_target_audience VARCHAR(50),
    b_event_schedule TIMESTAMP,
    b_expected_turnout INT,
    b_event_objective VARCHAR(300),
    b_comments_osl VARCHAR(300),
    b_comments_root VARCHAR(300),

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
    c_comments_osl VARCHAR(1000),
    c_comments_root VARCHAR(1000),

    d1a_club_income_fund MONEY,
    d1a_osl_seed_fund MONEY,
    d1a_donation MONEY,
    d1b_revenue MONEY,
    d1b_donation_or_scholarship MONEY,
    d1b_total_source_of_funds MONEY,

    d11_items_goods_services TEXT[],
    d11_price TEXT[],
    d11_quantity TEXT[],
    d11_amount TEXT[],
    d11_total_revenue MONEY,

    d2_items TEXT[],
    d2_reason_for_purchase TEXT[],
    d2_venue TEXT[],
    d2_total_expenditure MONEY,
    d_comments_osl VARCHAR(300),
    d_comments_root VARCHAR(300),

    e_personal_data INT,
    e_comments_osl VARCHAR(50),
    e_comments_root VARCHAR(50),

    f_name TEXT[],
    f_student_id TEXT[],
    f_position TEXT[],
    f_comments_osl VARCHAR(50),
    f_comments_root VARCHAR(50),

    g_1_1 VARCHAR(100),
    g_1_2 VARCHAR(100),
    g_1_3 VARCHAR(100),
    
    g_2_1 VARCHAR(100),
    g_2_2 VARCHAR(100),
    g_2_3 VARCHAR(100),

    g_3_1 VARCHAR(100),
    g_3_2 VARCHAR(100),
    g_3_3 VARCHAR(100),

    g_4_1 VARCHAR(100),
    g_4_2 VARCHAR(100),
    g_4_3 VARCHAR(100),

    g_5_1 VARCHAR(100),
    g_5_2 VARCHAR(100),
    g_5_3 VARCHAR(100),

    g_6_1 VARCHAR(100),
    g_6_2 VARCHAR(100),
    g_6_3 VARCHAR(100),

    g_7_1 VARCHAR(100),
    g_7_2 VARCHAR(100),
    g_7_3 VARCHAR(100),
    g_comments_osl VARCHAR(300),
    g_comments_root VARCHAR(300),

    CONSTRAINT fk_exco
        FOREIGN KEY(exco_user_id)
            REFERENCES exco(user_id)
);

CREATE TABLE FILES (
    file_id SERIAL PRIMARY KEY,
    epf_id INT NOT NULL,
    file_name VARCHAR(300) NOT NULL,
    file_data BYTEA NOT NULL,

    CONSTRAINT fk_epf
        FOREIGN KEY(epf_id)
            REFERENCES EPFS(epf_id) ON DELETE CASCADE 
);






