/*
Logic for Users DB
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

export async function createUser(name, email, password) {
  const pool = new Pool(credentials);
  const values = [name, email, password];
  const query = `INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3);`;
  await pool.query(query, values);
  await pool.end();
}

export async function getUsers() {
  const pool = new Pool(credentials);
  const result = await pool.query(`SELECT * FROM USERS;`);
  await pool.end();
  return result["rows"];
}

export async function getUser(user_id) {
  const pool = new Pool(credentials);
  const result = await pool.query(
    `SELECT * FROM USERS WHERE user_id=${user_id};`
  );
  await pool.end();
  return result["rows"];
}

export async function getUserEPFs(user_id) {
  const pool = new Pool(credentials);
  const values = [user_id];
  const result = await pool.query(
    `SELECT * FROM USERS WHERE user_id=$1`,
    values
  );
  await pool.end();
  return result["rows"];
}

export async function updateUser(user_id, name, email, password) {
  const pool = new Pool(credentials);
  const values = [name, email, password, user_id];
  const query = `UPDATE USERS SET name=$1, email=$2, password=$3 WHERE user_id=$4;`;
  await pool.query(query, values);
  await pool.end();
}

export async function deleteUser(user_id) {
  const pool = new Pool(credentials);
  const values = [user_id];
  const query = `DELETE FROM USERS WHERE user_id=$1;`;
  await pool.query(query, values);
  await pool.end();
}
