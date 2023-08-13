import { createUser, deleteUser, getUser } from "../../models/user_db";
import {
  test_pool,
  deleteFromTables,
  expectUserToMatch,
} from "./exco_test_utils";

describe("deleteUser", () => {
  afterEach(async () => {
    await deleteFromTables(test_pool);
  });

  test("Test ID: 1 - Valid user ID, Delete user record by user ID", async () => {
    const testUserId = "User1";
    const testName = "Test User1";
    const testEmail = "test1@test.com";
    const testType = "FRE";
    const createdUser = await createUser(
      testUserId,
      testName,
      testEmail,
      testType,
      test_pool
    );
    const deletedUser = await deleteUser(createdUser.user_id, test_pool);

    expectUserToMatch(deletedUser, {
      user_id: createdUser.user_id,
      name: testName,
      email: testEmail,
      is_deleted: true,
    });

    const fetchedUser = await getUser(createdUser.user_id, test_pool);
    expect(fetchedUser).toEqual([]); // expect null if user cannot be found
  });

  test("Test ID: 2 - Valid user ID but user's already deleted, Delete user record by user ID", async () => {
    const testUserId = "User2";
    const testName = "Test User2";
    const testEmail = "test2@test.com";
    const testType = "FRE";
    const createdUser = await createUser(
      testUserId,
      testName,
      testEmail,
      testType,
      test_pool
    );
    await deleteUser(createdUser.user_id, test_pool);
    await expect(deleteUser(createdUser.user_id, test_pool)).rejects.toThrow(
      "User does not exist or has already been deleted."
    );
  });

  test("Test ID: 3 - Non-existing/existing but deleted user ID, Delete user record by a non-existing ID", async () => {
    const nonExistingUserId = "nonexistent";
    await expect(deleteUser(nonExistingUserId, test_pool)).rejects.toThrow(
      "User does not exist"
    );
  });

  test("Test ID: 4 - No User ID, Delete user record with no User ID (undefined)", async () => {
    await expect(deleteUser(undefined, test_pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  afterAll(async () => {
    await deleteFromTables(test_pool);
  });
});
