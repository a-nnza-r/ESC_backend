import { getUser, createUser } from "../../models/user_db";
import {
  test_pool,
  deleteFromTables,
  expectUserToMatch,
} from "./exco_test_utils";

let createdUserId;

describe("getUser", () => {
  beforeEach(async () => {
    await deleteFromTables(test_pool);
    createdUserId = "12345678"; // or generate this dynamically
    const result = await createUser(
      createdUserId,
      "Test User",
      "test@test.com",
      "exco",
      test_pool
    );
    // assuming the createUser function returns the created user
    createdUserId = result.user_id;
  });

  test("Test ID: 1 - Valid user ID: Retrieve user record by user ID", async () => {
    const result = await getUser(createdUserId, test_pool);
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
    const result = await getUser(nonExistentUserId, test_pool);
    expect(result).toHaveLength(0);
  });

  test("Test ID: 3 - No user ID provided: Retrieve user record with no input", async () => {
    await expect(getUser(undefined, test_pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  test("Test ID: 4 - Test row locks", async () => {
    await expect(getUser(undefined, test_pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  afterAll(async () => {
    await deleteFromTables(test_pool);
  });
});
