import { getUsers, createUser, deleteUser } from "../../models/user_db";
import {
  test_pool,
  deleteFromTables,
  expectUserToMatch,
} from "./exco_test_utils";

describe("getUsers", () => {
  beforeEach(async () => {
    await deleteFromTables(test_pool);
  });

  test("Test ID: 1 - Retrieve all active Users from the table", async () => {
    const userData1 = {
      userID: "1",
      name: "John Loh",
      email: "john_loh@example.com",
      type: "FRE",
    };
    const userData2 = {
      userID: "2",
      name: "John High",
      email: "john_high@example.com",
      type: "FRE",
    };

    const user1 = await createUser(
      userData1.userID,
      userData1.name,
      userData1.email,
      userData1.type,
      test_pool
    );
    const user2 = await createUser(
      userData2.userID,
      userData2.name,
      userData2.email,
      userData2.type,
      test_pool
    );

    const result = await getUsers(test_pool);

    const received = [...result].sort((a, b) => a.name.localeCompare(b.name));
    const expected = [user1, user2].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    expected.forEach((user, index) => {
      expectUserToMatch(received[index], {
        userID: user.userID,
        name: user.name,
        email: user.email,
        type: user.type,
      });
    });
  });

  test("Test ID: 2 - Empty table: No Users in the table", async () => {
    const result = await getUsers(test_pool);
    expect(result).toEqual([]);
  });

  test("Test ID: 3 - Some users are deleted: Deleted Users are not returned", async () => {
    const userData1 = {
      userID: "3",
      name: "John Loh",
      email: "john_loh@example.com",
      type: "FRE",
    };
    const userData2 = {
      userID: "4",
      name: "John High",
      email: "john_high@example.com",
      type: "FRE",
    };

    const user1 = await createUser(
      userData1.userID,
      userData1.name,
      userData1.email,
      userData1.type,
      test_pool
    );
    const user2 = await createUser(
      userData2.userID,
      userData2.name,
      userData2.email,
      userData2.type,
      test_pool
    );
    await deleteUser(user2.user_id, test_pool);

    const result = await getUsers(test_pool);

    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], {
      userID: user1.userID,
      name: user1.name,
      email: user1.email,
      type: user1.type,
    });
  });

  afterAll(async () => {
    await deleteFromTables(test_pool);
  });
});
