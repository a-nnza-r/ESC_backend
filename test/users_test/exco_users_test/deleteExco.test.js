const { createEXCO, deleteEXCO, getEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("deleteEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
    await deleteFromTables(pool);
  });

  afterEach(async () => {
    await deleteFromTables(pool);
  });

  afterAll(async () => {
    await pool.end();
  });

  test("Test ID: 1 - Valid user ID, Delete Exco record by user ID", async () => {
    const testName = "Test User1";
    const testEmail = "test1@test.com";
    const createdUser = await createEXCO(testName, testEmail, pool);
    const deletedUser = await deleteEXCO(createdUser.user_id, pool);

    expectUserToMatch(deletedUser, {
      user_id: createdUser.user_id,
      name: testName,
      email: testEmail,
      is_deleted: true,
    });

    const fetchedUser = await getEXCO(createdUser.user_id, pool);
    expect(fetchedUser).toEqual([]); // expect an empty array if user cannot be found
  });

  test("Test ID: 2 - Valid user ID but user's already deleted, Delete Exco record by user ID", async () => {
    const testName = "Test User2";
    const testEmail = "test2@test.com";
    const createdUser = await createEXCO(testName, testEmail, pool);
    await deleteEXCO(createdUser.user_id, pool);
    await expect(deleteEXCO(createdUser.user_id, pool)).rejects.toThrow(
      "EXCO user has already been delete"
    );
  });

  test("Test ID: 3 - Non-existing/existing but deleted user ID, Delete Exco record by a non-existing ID", async () => {
    const nonExistingUserId = 99999;
    await expect(deleteEXCO(nonExistingUserId, pool)).rejects.toThrow(
      "EXCO user does not exist"
    );
  });

  test("Test ID: 4 - Non-integer user ID, Delete Exco record by non-integer", async () => {
    const nonIntegerUserId = "invalid";
    await expect(deleteEXCO(nonIntegerUserId, pool)).rejects.toThrow(
      "User ID must be a positive integer"
    );
  });

  test("Test ID: 5 - No User ID, Delete Exco record with no User ID (undefined)", async () => {
    await expect(deleteEXCO(undefined, pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });
});
