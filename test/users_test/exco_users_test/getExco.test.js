const { getEXCO, createEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;
let createdUserId;

describe("getEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
  });
  beforeEach(async () => {
    await deleteFromTables(pool);
    const result = await createEXCO("Test User", "test@test.com", pool);
    createdUserId = result.user_id;
  });

  test("Test ID: 1 - Valid user ID: Retrieve EXCO record by user ID", async () => {
    const result = await getEXCO(createdUserId, pool);
    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], {
      user_id: createdUserId,
      name: "Test User",
      email: "test@test.com",
      is_deleted: false,
    });
  });

  test("Test ID: 2 - Invalid user ID: Retrieve EXCO record by non-existent ID", async () => {
    const result = await getEXCO(999, pool); // Or any other non-existent ID
    expect(result).toHaveLength(0);
  });

  test("Test ID: 3 - Non-integer user ID: Retrieve EXCO record by non-integer", async () => {
    await expect(getEXCO("abc", pool)).rejects.toThrow(); // Should throw an error
  });

  test("Test ID: 4 - No user ID provided: Retrieve EXCO record with no input", async () => {
    await expect(getEXCO(null, pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  afterAll(async () => {
    await pool.end();
  });
});
