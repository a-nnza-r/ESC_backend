/*
Logic for Users DB
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

export async function createUser(name, email, password) {
    const pool = new Pool(credentials)
    const query = `INSERT INTO USERS (name, email, password) VALUES ('${name}', '${email}', '${password}');`
    await pool.query(query)
    await pool.end()
}

export async function getUsers() {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM USERS;`)
    await pool.end()
    return result["rows"]
}

export async function getUser(user_id) {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM USERS WHERE user_id=${user_id};`)
    await pool.end()
    return result["rows"]
}

export async function getUserEPFs(user_id) {
    const pool = new Pool(credentials)
    const result = await pool.query(`SELECT * FROM EPFS WHERE user_id=${user_id};`)
    await pool.end()
    return result["rows"]
}


export async function updateUser(user_id, name, email, password) {
    const pool = new Pool(credentials)
    await pool.query(`UPDATE USERS SET name='${name}', email='${email}', password='${password}' WHERE user_id=${user_id};`)
    await pool.end()
}

export async function deleteUser(user_id) {
    const pool = new Pool(credentials)
    const query = `DELETE FROM USERS WHERE user_id=${user_id};`
    await pool.query(query)
    await pool.end()
}

