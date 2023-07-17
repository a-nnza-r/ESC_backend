/*
Logic for Users DB
*/
import pg from "pg";
const { Pool } = pg;
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

var download_location = process.env.DOWNLOADPATH;

export async function uploadFiles(epf_id, files) {
  const pool = new Pool(credentials);
  try {
    files.forEach(async (file) => {
      const file_name = file.originalname;
      const file_data = file.buffer;
      await pool.query(
        `INSERT INTO FILES (epf_id,file_name,file_data) VALUES ($1,$2,$3);`,
        [epf_id, file_name, file_data]
      );
    });
  } catch (e) {
    throw e;
  } finally {
    await pool.end();
  }
}

export async function getFiles(epf_id) {
  const pool = new Pool(credentials);
  try {
    const result = await pool.query(
      `SELECT file_id, file_name, file_data from FILES where epf_id=$1`,
      [epf_id]
    );
    const files = result.rows;
    const file_metadata = {};
    files.forEach((file) => {
      const { file_id, file_name, file_data } = file;
      file_metadata[file_id] = file_name;
      const file_path = path.join(download_location, file_name);
      fs.writeFile(file_path, file_data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
    return file_metadata;
  } catch (e) {
    throw e;
  } finally {
    pool.end();
  }
}

export async function deleteFiles(file_ids) {
  const pool = new Pool(credentials);
  try {
    const res = await pool.query(`DELETE FROM FILES WHERE file_id=ANY($1) `, [
      file_ids,
    ]);
    return res.rowCount;
  } catch (e) {
    throw e;
  } finally {
    pool.end();
  }
}
