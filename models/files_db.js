/*
Logic for Users DB
*/
import pg from "pg";
const { Pool } = pg;
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import {createPool} from "./db_utils.js"
const defaultPool = createPool();

var download_location = process.env.DOWNLOADPATH;

export async function uploadFiles(epf_id, files, pool = defaultPool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    files.forEach(async (file) => {
      const file_name = file.originalname;
      const file_data = file.buffer;
      await pool.query(
        `INSERT INTO FILES (epf_id,file_name,file_data) VALUES ($1,$2,$3);`,
        [epf_id, file_name, file_data]
      );
    });
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getFiles(epf_id, pool = defaultPool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await pool.query(
      `SELECT file_id, file_name, file_data from FILES where epf_id=$1 AND is_deleted = false`,
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
    await client.query("COMMIT");
    return file_metadata;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function deleteFiles(file_ids) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const res = await pool.query(`UPDATE FILES SET is_deleted = true WHERE file_id=ANY($1)`, [
      file_ids,
    ]);
    await client.query("COMMIT");
    return res.rowCount;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
