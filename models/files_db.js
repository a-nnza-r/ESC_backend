/*
Logic for Users DB
*/
import pg from "pg";
const { Pool } = pg;
import fs from "fs";
import path from "path";

const credentials = {
  host: "127.0.0.1",
  user: "postgres",
  port: 5432,
  password: "123",
  database: "esc_db",
};

export async function uploadFiles(epf_id, files) {
  const pool = new Pool(credentials);
  files.forEach((file) => {
    const file_name = file.originalname;
    const file_data = file.buffer;
    pool.query(
      `INSERT INTO FILES (epf_id,file_name,file_data) VALUES ($1,$2,$3);`,
      [epf_id, file_name, file_data]
    );
  });

  await pool.end();
}

export async function getFiles(epf_id) {
  const pool = new Pool(credentials);
  const result = await pool.query(
    `SELECT file_name, file_data from FILES where epf_id=$1`,
    [epf_id]
  );
  const files = result.rows;
  files.forEach((file) => {
    const { file_name, file_data } = file;
    //Add own path, add config file later
    const file_path = path.join(
      "C:\\Users\\johnl\\Documents\\project_test_download",
      file_name
    );
    fs.writeFile(file_path, file_data, (err) => {
      if (err) {
        console.log("Error", err);
        return;
      }
      console.log("File saved: ", file_path);
    });
  });
  await pool.end();
}
