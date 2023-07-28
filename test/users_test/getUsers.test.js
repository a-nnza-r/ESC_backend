const { getUsers, createUser, deleteUser } = require("../../models/user_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("getUsers", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Retrieve all active Users from the table", async () => {
    const userData1 = {
      userID: "1",
      name: "John Loh",
      email: "john_loh@example.com",
      type: "exco",
    };
    const userData2 = {
      userID: "2",
      name: "John High",
      email: "john_high@example.com",
      type: "exco",
    };

    const user1 = await createUser(
      userData1.userID,
      userData1.name,
      userData1.email,
      userData1.type,
      pool
    );
    const user2 = await createUser(
      userData2.userID,
      userData2.name,
      userData2.email,
      userData2.type,
      pool
    );

    const result = await getUsers(pool);

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
    const result = await getUsers(pool);
    expect(result).toEqual([]);
  });

  test("Test ID: 3 - Some users are deleted: Deleted Users are not returned", async () => {
    const userData1 = {
      userID: "3",
      name: "John Loh",
      email: "john_loh@example.com",
      type: "exco",
    };
    const userData2 = {
      userID: "4",
      name: "John High",
      email: "john_high@example.com",
      type: "exco",
    };

    const user1 = await createUser(
      userData1.userID,
      userData1.name,
      userData1.email,
      userData1.type,
      pool
    );
    const user2 = await createUser(
      userData2.userID,
      userData2.name,
      userData2.email,
      userData2.type,
      pool
    );
    await deleteUser(user2.user_id, pool);

    const result = await getUsers(pool);

    expect(result).toHaveLength(1);
    expectUserToMatch(result[0], {
      userID: user1.userID,
      name: user1.name,
      email: user1.email,
      type: user1.type,
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
