const { getEXCOsByAttribute } = require("../../../models/exco_db");
const { createPool, deleteFromTables } = require("./exco_test_utils");

let pool;

describe("getEXCOsByAttribute", () => {
  beforeAll(async () => {
    pool = await createPool();
  }, 20000);

  beforeEach(async () => {
    await deleteFromTables(pool);
    await pool.query(
      "INSERT INTO EXCO (name, email) VALUES ('Test User', 'test@test.com')"
    );
    await pool.query(
      "INSERT INTO EXCO (name, email) VALUES ('Albert', 'albert@test.com')"
    );
  });

  test("Valid inputs: Retrieve EXCO records", async () => {
    const attributes = { name: { operator: "=", value: "Test User" } };
    const result = await getEXCOsByAttribute(attributes, pool);

    result.forEach((res) => {
      expect(res).toMatchObject({
        name: "Test User",
        email: "test@test.com",
        outstanding_epf: null,
      });
    });
  });

  test("Retrieve records with multiple filters", async () => {
    const attributes = {
      name: { operator: "=", value: "Test User" },
      email: { operator: "=", value: "test@test.com" },
    };
    const result = await getEXCOsByAttribute(attributes, pool);

    result.forEach((res) => {
      expect(res).toMatchObject({
        name: "Test User",
        email: "test@test.com",
        outstanding_epf: null,
      });
    });
  });

  test("Retrieve records with invalid attribute", async () => {
    await expect(
      getEXCOsByAttribute({ dob: { operator: "=", value: "2000-01-01" } }, pool)
    ).rejects.toThrowError(
      new Error("Cannot read properties of undefined (reading 'includes')")
    );
  });

  test("Sorting the resultset based on column in ascending order", async () => {
    const attributes = {
      name: { operator: "=", value: "test" },
      sort: { column: "name", direction: "ASC" },
    };
    const result = await getEXCOsByAttribute(attributes, pool);

    expect(result).toEqual([]);
  });

  test("Invalid column or direction in sort property", async () => {
    const attributes = {
      name: { operator: "=", value: "Test User" },
      sort: { column: "name", direction: "ANY" },
    };
    await expect(getEXCOsByAttribute(attributes, pool)).rejects.toThrowError(
      new Error(
        'Sort property must have "column" and "direction" properties and direction must be one of ASC, DESC'
      )
    );
  });

  afterAll((done) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error acquiring client", err.stack);
        done(err);
      }
      client.query("SELECT NOW()", (_err) => {
        release();
        if (_err) {
          console.error("Error executing query", _err.stack);
          done(_err);
        }
        done();
      });
    });
  }, 60000);
});
