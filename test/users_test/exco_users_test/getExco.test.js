const { getEXCO, createEXCO } = require("../../../models/exco_db");
const { createPool, deleteFromTables } = require("./exco_test_utils");

let pool;
let createdUserId;

describe("getEXCO", () => {
  beforeAll(async () => {
    pool = createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
    const createdUser = await createEXCO("Test User", "test@test.com", pool);
    createdUserId = createdUser.user_id;
  });

  // Test ID 1
  test("Valid user ID: Retrieve EXCO record by user ID", async () => {
    const result = await getEXCO(createdUserId, pool);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      user_id: createdUserId,
      name: "Test User",
      email: "test@test.com",
    });
  });

  // Test ID 2
  test("Invalid user ID: Retrieve EXCO record by non-existent ID", async () => {
    const result = await getEXCO(999, pool); // or any other non-existent ID
    expect(result).toHaveLength(0);
  });

  // Test ID 3
  test("Non-integer user ID: Retrieve EXCO record by non-integer", async () => {
    await expect(getEXCO("abc", pool)).rejects.toThrow(); // Should throw an error
  });

  // Test ID 4
  test("No user ID provided: Retrieve EXCO record with no input", async () => {
    await expect(getEXCO(null, pool)).rejects.toThrow(); // Should throw an error
  });

  afterAll(async () => {
    await pool.end();
  });
});
