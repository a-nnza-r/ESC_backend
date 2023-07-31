const { createUser, deleteUser, getUser } = require("../../models/user_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("deleteUser", () => {
  beforeAll(async () => {
    pool = await createPool();
    await deleteFromTables(pool);
  });

  afterEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Valid user ID, Delete user record by user ID", async () => {
    const testUserId = "User1";
    const testName = "Test User1";
    const testEmail = "test1@test.com";
    const testType = "exco";
    const createdUser = await createUser(
      testUserId,
      testName,
      testEmail,
      testType,
      pool
    );
    const deletedUser = await deleteUser(createdUser.user_id, pool);

    expectUserToMatch(deletedUser, {
      user_id: createdUser.user_id,
      name: testName,
      email: testEmail,
      is_deleted: true,
    });

    const fetchedUser = await getUser(createdUser.user_id, pool);
    expect(fetchedUser).toEqual([]); // expect null if user cannot be found
  });

  test("Test ID: 2 - Valid user ID but user's already deleted, Delete user record by user ID", async () => {
    const testUserId = "User2";
    const testName = "Test User2";
    const testEmail = "test2@test.com";
    const testType = "exco";
    const createdUser = await createUser(
      testUserId,
      testName,
      testEmail,
      testType,
      pool
    );
    await deleteUser(createdUser.user_id, pool);
    await expect(deleteUser(createdUser.user_id, pool)).rejects.toThrow(
      "User has already been deleted"
    );
  });

  test("Test ID: 3 - Non-existing/existing but deleted user ID, Delete user record by a non-existing ID", async () => {
    const nonExistingUserId = "nonexistent";
    await expect(deleteUser(nonExistingUserId, pool)).rejects.toThrow(
      "User does not exist"
    );
  });

  test("Test ID: 4 - No User ID, Delete user record with no User ID (undefined)", async () => {
    await expect(deleteUser(undefined, pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  afterAll(async () => {
    await deleteFromTables(pool);
    await pool.end();
  });
});
