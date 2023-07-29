/*
Logic for Users DB
*/
import JSZip from 'jszip';

import { createPool } from "./db_utils.js";
const defaultPool = createPool();

export async function uploadFiles(epf_id, files, pool = defaultPool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    //Check for valid epf_id
    const valid_epf_id = await pool.query(
      `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
      [epf_id]
    );
    if (valid_epf_id.rows[0]["count"] == 0) {
      throw new Error("Non-existent epf");
    }
    
    /*
    files.forEach(async (file) => {
      const file_name = file.originalname;
      const file_data = file.buffer;
      await pool.query(
        `INSERT INTO FILES (epf_id,file_name,file_data) VALUES ($1,$2,$3);`,
        [epf_id, file_name, file_data]
      );
    });
    */

    for(const file of files) {
      const file_name = file.originalname;
      const file_data = file.buffer;
      await pool.query(
        `INSERT INTO FILES (epf_id,file_name,file_data) VALUES ($1,$2,$3);`,
        [epf_id, file_name, file_data]
      );
    }

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

    //Check for valid epf_id
    const valid_epf_id = await pool.query(
      `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
      [epf_id]
    );
    if (valid_epf_id.rows[0]["count"] == 0) {
      throw new Error("Non-existent epf");
    }

    const result = await pool.query(
      `SELECT file_id, file_name from FILES where epf_id=$1 AND is_deleted = false`,
      [epf_id]
    );
    const files = result.rows;
    const file_metadata = {};
    files.forEach((file) => {
      const { file_id, file_name } = file;
      file_metadata[file_id] = file_name;
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


export async function downloadFiles(epf_id, pool = defaultPool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    //Check for valid epf_id
    const valid_epf_id = await pool.query(
      `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
      [epf_id]
    );
    if (valid_epf_id.rows[0]["count"] == 0) {
      throw new Error("Non-existent epf");
    }

    const result = await pool.query(
      `SELECT file_id, file_name, file_data from FILES where epf_id=$1 AND is_deleted = false`,
      [epf_id]
    );
    const zip = new JSZip();
    const files = result.rows;
    files.forEach((file) => {
      const { file_id, file_name, file_data } = file;
      zip.file(file_name, file_data)
    });

    const epf_name_result = await pool.query(
      `SELECT b_event_name from epfs where epf_id=$1`,
      [epf_id]
    );

    const epf_name = epf_name_result.rows[0].b_event_name;
    const zipFile = await zip.generateAsync({ type: 'nodebuffer' });

    await client.query("COMMIT");

    return {"zip_file": zipFile, "epf_name": epf_name}
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

    //Check for valid file_ids
    for(const fid of file_ids) {

      const valid_file_id = await pool.query(
        `SELECT COUNT(*) FROM FILES WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );
      if (valid_epf_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent epf");
      }

    }

    const res = await pool.query(
      `UPDATE FILES SET is_deleted = true WHERE file_id=ANY($1)`,
      [file_ids]
    );
    await client.query("COMMIT");
    return res.rowCount;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
