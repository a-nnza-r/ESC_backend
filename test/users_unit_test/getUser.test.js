const { getUser, createUser } = require("../../models/user_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;
let createdUserId;

describe("getUser", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
    createdUserId = "12345678"; // or generate this dynamically
    const result = await createUser(
      createdUserId,
      "Test User",
      "test@test.com",
      "exco",
      pool
    );
    // assuming the createUser function returns the created user
    createdUserId = result.user_id;
  });

  test("Test ID: 1 - Valid user ID: Retrieve user record by user ID", async () => {
    const result = await getUser(createdUserId, pool);
    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], {
      user_id: createdUserId,
      name: "Test User",
      email: "test@test.com",
      is_deleted: false,
    });
  });

  test("Test ID: 2 - Invalid user ID: Retrieve user record by non-existent ID", async () => {
    const nonExistentUserId = "nonexistent";
    const result = await getUser(nonExistentUserId, pool);
    expect(result).toHaveLength(0);
  });

  test("Test ID: 3 - No user ID provided: Retrieve user record with no input", async () => {
    await expect(getUser(undefined, pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  afterAll(async () => {
    await pool.end();
  });
});
