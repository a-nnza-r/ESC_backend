/*
Logic for Users DB
*/
import JSZip from "jszip";
import { db_pool } from "./db_utils.js";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 200;

export async function uploadFiles(epf_id, files, pool = db_pool) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const client = await pool.connect();
    try {
      // Set the transaction isolation level to SERIALIZABLE
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid epf_id
      const valid_epf_id = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );
      if (valid_epf_id.rows[0]["count"] === 0) {
        throw new Error("Non-existent epf");
      }

      for (const file of files) {
        const file_name = file.originalname;
        const file_data = file.buffer;
        await client.query(
          `INSERT INTO FILES (epf_id, file_name, file_data) VALUES ($1, $2, $3);`,
          [epf_id, file_name, file_data]
        );
      }

      await client.query("COMMIT");
      return; // Operation successful, exit the function
    } catch (err) {
      await client.query("ROLLBACK");
      if (
        err.message.includes("deadlock detected") ||
        err.message.includes("could not serialize access")
      ) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        throw err; // Throw other non-retryable errors
      }
    } finally {
      client.release();
    }
  }

  throw new Error("Exceeded maximum retries for uploadFiles operation.");
}

export async function getFiles(epf_id, pool = db_pool) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const client = await pool.connect();
    try {
      // Set the transaction isolation level to SERIALIZABLE
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid epf_id
      const valid_epf_id = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );
      if (valid_epf_id.rows[0]["count"] === 0) {
        throw new Error("Non-existent epf");
      }

      const result = await client.query(
        `SELECT file_id, file_name from FILES WHERE epf_id = $1 AND is_deleted = false`,
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
    } catch (err) {
      await client.query("ROLLBACK");
      if (
        err.message.includes("deadlock detected") ||
        err.message.includes("could not serialize access")
      ) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        throw err; // Throw other non-retryable errors
      }
    } finally {
      client.release();
    }
  }

  throw new Error("Exceeded maximum retries for getFiles operation.");
}

export async function downloadFiles(epf_id, pool = db_pool) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const client = await pool.connect();
    try {
      // Set the transaction isolation level to SERIALIZABLE
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid epf_id
      const valid_epf_id = await client.query(
        `SELECT COUNT(*) FROM EPFS WHERE epf_id = $1 AND is_deleted = false`,
        [epf_id]
      );
      if (valid_epf_id.rows[0]["count"] == 0) {
        throw new Error("Non-existent epf");
      }

      const result = await client.query(
        `SELECT file_id, file_name, file_data from FILES where epf_id=$1 AND is_deleted = false`,
        [epf_id]
      );
      const zip = new JSZip();
      const files = result.rows;
      files.forEach((file) => {
        const { file_id, file_name, file_data } = file;
        zip.file(file_name, file_data);
      });

      const epf_name_result = await client.query(
        `SELECT b_event_name from epfs where epf_id=$1`,
        [epf_id]
      );

      const epf_name = epf_name_result.rows[0].b_event_name;
      const zipFile = await zip.generateAsync({ type: "nodebuffer" });

      await client.query("COMMIT");

      return { zip_file: zipFile, epf_name: epf_name };
    } catch (err) {
      await client.query("ROLLBACK");
      if (err.message.includes("could not serialize access")) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        throw err; // Throw other non-retryable errors
      }
    } finally {
      client.release();
    }
  }

  throw new Error("Exceeded maximum retries for downloadFiles operation.");
}

export async function deleteFiles(file_ids, pool = db_pool) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const client = await pool.connect();
    try {
      // Set the transaction isolation level to SERIALIZABLE
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Check for valid file_ids
      for (const fid of file_ids) {
        const valid_file_id = await client.query(
          `SELECT COUNT(*) FROM FILES WHERE file_id = $1 AND is_deleted = false`,
          [fid]
        );
        if (valid_file_id.rows[0]["count"] == 0) {
          throw new Error("Non-existent file_id");
        }
      }

      const res = await client.query(
        `UPDATE FILES SET is_deleted = true WHERE file_id=ANY($1)`,
        [file_ids]
      );
      await client.query("COMMIT");
      return res.rowCount;
    } catch (err) {
      await client.query("ROLLBACK");
      if (err.message.includes("could not serialize access")) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        throw err; // Throw other non-retryable errors
      }
    } finally {
      client.release();
    }
  }

  throw new Error("Exceeded maximum retries for deleteFiles operation.");
}
