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

CREATE TABLE EPFS (
    epf_id SERIAL PRIMARY KEY,
    status VARCHAR(50), 
    exco_user_id INT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    A_name VARCHAR(50),
    A_student_id INT,
    A_organisation VARCHAR(50),
    A_contact_number INT,
    A_email VARCHAR(50),
    A_comments_OSL VARCHAR(50),
    A_comments_ROOT VARCHAR(50),

    B_event_name VARCHAR(50) NOT NULL,
    B_target_audience VARCHAR(50),
    B_event_schedule TIMESTAMP,
    B_expected_turnout INT,
    B_event_objective VARCHAR(300),
    B_comments_OSL VARCHAR(300),
    B_comments_ROOT VARCHAR(300),

    C1_date TEXT[],
    C1_time TEXT[],
    C1_activity_and_description TEXT[],
    C1_venue TEXT[],

    C2_date TEXT[],
    C2_time TEXT[],
    C2_activity_and_description TEXT[],
    C2_venue TEXT[],

    C3_date TEXT[],
    C3_time TEXT[],
    C3_activity_and_description TEXT[],
    C3_venue TEXT[],

    C3_cleanup_date TEXT[],
    C3_cleanup_time TEXT[],
    C3_cleanup_activity_and_description TEXT[],
    C3_cleanup_venue TEXT[],
    C_comments_OSL VARCHAR(1000),
    C_comments_ROOT VARCHAR(1000),

    D1A_club_income_fund MONEY,
    D1A_osl_seed_fund MONEY,
    D1A_donation MONEY,
    D1B_revenue MONEY,
    D1B_donation_or_scholarship MONEY,
    D1B_total_source_of_funds MONEY,

    D11_items_goods_services TEXT[],
    D11_price TEXT[],
    D11_quantity TEXT[],
    D11_amount TEXT[],
    D11_total_revenue MONEY,

    D2_items TEXT[],
    D2_reason_for_purchase TEXT[],
    D2_venue TEXT[],
    D2_total_expenditure MONEY,
    D_comments_OSL VARCHAR(300),
    D_comments_ROOT VARCHAR(300),

    E_personal_data INT,
    E_comments_OSL VARCHAR(50),
    E_comments_ROOT VARCHAR(50),

    F_name TEXT[],
    F_student_id TEXT[],
    F_position TEXT[],
    F_comments_OSL VARCHAR(50),
    F_comments_ROOT VARCHAR(50),

    G_1_1 VARCHAR(100),
    G_1_2 VARCHAR(100),
    G_1_3 VARCHAR(100),
    
    G_2_1 VARCHAR(100),
    G_2_2 VARCHAR(100),
    G_2_3 VARCHAR(100),

    G_3_1 VARCHAR(100),
    G_3_2 VARCHAR(100),
    G_3_3 VARCHAR(100),

    G_4_1 VARCHAR(100),
    G_4_2 VARCHAR(100),
    G_4_3 VARCHAR(100),

    G_5_1 VARCHAR(100),
    G_5_2 VARCHAR(100),
    G_5_3 VARCHAR(100),

    G_6_1 VARCHAR(100),
    G_6_2 VARCHAR(100),
    G_6_3 VARCHAR(100),

    G_7_1 VARCHAR(100),
    G_7_2 VARCHAR(100),
    G_7_3 VARCHAR(100),
    G_comments_OSL VARCHAR(300),
    G_comments_ROOT VARCHAR(300),

    CONSTRAINT fk_exco
        FOREIGN KEY(exco_user_id)
            REFERENCES EXCO(user_id)
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






