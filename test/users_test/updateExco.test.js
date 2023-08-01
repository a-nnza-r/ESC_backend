import { getUser, createUser, updateUser } from "../../models/user_db";
import {
  test_pool,
  deleteFromTables,
  expectUserToMatch,
} from "./exco_test_utils";

describe("updateUser", () => {
  beforeEach(async () => {
    await deleteFromTables(test_pool);
  });

  test("Test ID: 1 - Valid inputs: Update user record by user_id", async () => {
    const userData = {
      userID: "1",
      name: "Test User",
      email: "test@test.com",
      type: "exco",
    };
    const user = await createUser(
      userData.userID,
      userData.name,
      userData.email,
      userData.type,
      test_pool
    );
    const updatedUser = await updateUser(
      userData.userID,
      "Updated Name",
      "updated@example.com",
      "exco",
      test_pool
    );
    expectUserToMatch(updatedUser, {
      user_id: userData.userID,
      name: "Updated Name",
      email: "updated@example.com",
      user_type: "exco",
    });
  });

  test("Test ID: 2 - Invalid user_id: Update user record by non-existent ID", async () => {
    await expect(
      updateUser(
        "999",
        "Updated Name",
        "updated@example.com",
        "exco",
        test_pool
      )
    ).rejects.toThrow();
  });

  test("Test ID: 3 - Non-integer user_id: Update user record by non-integer", async () => {
    await expect(
      updateUser(
        "abc",
        "Updated Name",
        "updated@example.com",
        "exco",
        test_pool
      )
    ).rejects.toThrow();
  });

  test("Test ID: 4 - Invalid email format: Update user with an invalid email format", async () => {
    const userData = {
      userID: "2",
      name: "Test User",
      email: "test@test.com",
      type: "exco",
    };
    await createUser(
      userData.userID,
      userData.name,
      userData.email,
      userData.type,
      test_pool
    );
    await expect(
      updateUser(
        userData.userID,
        "Updated Name",
        "invalidemail",
        "exco",
        test_pool
      )
    ).rejects.toThrow();
  });

  test("Test ID: 5 - No inputs: Update user record without providing inputs", async () => {
    await expect(
      updateUser(null, null, null, null, test_pool)
    ).rejects.toThrow();
  });

  test("Test ID: 6 - Missing name/email: Update user record without providing name/email", async () => {
    const userData = {
      userID: "3",
      name: "Test User",
      email: "test@test.com",
      type: "exco",
    };
    await createUser(
      userData.userID,
      userData.name,
      userData.email,
      userData.type,
      test_pool
    );
    await expect(
      updateUser(userData.userID, null, null, null, test_pool)
    ).rejects.toThrow();
  });

  afterAll(async () => {
    await deleteFromTables(test_pool);
  });
});
