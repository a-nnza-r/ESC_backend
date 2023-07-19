const { getEXCO, createEXCO, deleteEXCO } = require("../../../models/exco_db");
const { createPool, deleteFromTables } = require("./exco_test_utils");

let pool;

describe("deleteEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
    await createEXCO("Test User", "test@test.com", pool);
  });

  test("Valid user ID: Delete EXCO record by user ID", async () => {
    await deleteEXCO(1, pool);

    const result = await getEXCO(1, pool);
    expect(result).toHaveLength(0); // Confirms the user has been deleted, as the length of result array is now 0
  });

  test("Invalid user ID: Delete EXCO record by non-existing ID", async () => {
    await deleteEXCO(999, pool);

    const result = await getEXCO(999, pool);
    expect(result).toHaveLength(0);
  });

  test("Non-integer user ID: Delete EXCO record by non-integer", async () => {
    await expect(deleteEXCO("abc", pool)).rejects.toThrow();
  });

  test("No user ID: Delete EXCO record without providing ID", async () => {
    await expect(deleteEXCO(null, pool)).rejects.toThrow();
  });

  afterAll(async () => {
    await pool.end();
  });
});
