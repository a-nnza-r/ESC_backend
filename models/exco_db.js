/*
Logic for Users DB
*/
import pg from 'pg'
const {Pool} = pg

const credentials = {
    host: '127.0.0.1',
    user: 'postgres',
    port: 5433,
    password: 'password',
    database: 'esc_db'
}

export async function createEXCO(name, email) {
    const pool = new Pool(credentials)
    const query = `INSERT INTO EXCO (name, email) VALUES ('${name}', '${email}');`
    await pool.query(query)
    await pool.end()
}

export async function getEXCOs() {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EXCO;`)
    await pool.end()
    return result["rows"]
}

export async function getEXCO(user_id) {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EXCO WHERE user_id=${user_id};`)
    await pool.end()
    return result["rows"]
}

export async function getEXCOEPFs(user_id) {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EPFS WHERE user_id=${user_id};`)
    await pool.end()
    return result["rows"]
}


export async function updateEXCO(user_id, name, email, password) {
    const pool = new Pool(credentials)
    await pool.query(`UPDATE EXCO SET name='${name}', email='${email}' WHERE user_id=${user_id};`)
    await pool.end()
}

export async function deleteEXCO(user_id) {
    const pool = new Pool(credentials)
    const query = `DELETE FROM EXCO WHERE user_id=${user_id};`
    await pool.query(query)
    await pool.end()
}

