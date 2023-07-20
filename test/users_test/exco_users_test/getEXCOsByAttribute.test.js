const { getEXCOsByAttribute, createEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("getEXCOsByAttribute", () => {
  let excoData1, excoData2;

  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
    excoData1 = await createEXCO("Test User", "test@test.com", pool);
    excoData2 = await createEXCO("Albert", "albert@test.com", pool);
  });

  test("Test ID: 1 - Valid inputs: Retrieve EXCO records", async () => {
    const attributes = { name: { operator: "=", value: "Test User" } };
    const result = await getEXCOsByAttribute(attributes, pool);
    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], excoData1);
  });

  test("Test ID: 2 - Retrieve records with multiple filters", async () => {
    const attributes = {
      name: { operator: "=", value: "Test User" },
      email: { operator: "=", value: "test@test.com" },
    };
    const result = await getEXCOsByAttribute(attributes, pool);
    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], excoData1);
  });

  test("Test ID: 3 - Retrieve records with invalid attribute", async () => {
    const attributes = {
      nonExistentAttribute: { operator: "=", value: "2000-01-01" },
    };
    await expect(getEXCOsByAttribute(attributes, pool)).rejects.toThrow();
  });

  test("Test ID: 4 - Sorting the resultset based on column in ascending order", async () => {
    const attributes = {
      sort: { column: "name", direction: "ASC" },
    };
    const result = await getEXCOsByAttribute(attributes, pool);
    expect(result).toEqual([excoData2, excoData1]);
  });

  test("Test ID: 5 - Invalid column or direction in sort property", async () => {
    const attributes = {
      sort: { column: "name", direction: "WrongDirection" },
    };
    await expect(getEXCOsByAttribute(attributes, pool)).rejects.toThrow(
      new Error(
        'Sort property must have "column" and "direction" properties and direction must be one of ASC, DESC'
      )
    );
  });

  afterAll(async () => {
    await pool.end();
  });
});
