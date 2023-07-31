const { createUser } = require("../../models/user_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("createUser", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  // Correct input cases
  test("Test ID: 1.1 - Valid input: Create root user with valid name, email and id", async () => {
    const user_id = "root01";
    const name = "Root User";
    const email = "root_user@example.com";
    const type = "root";
    const createdUser = await createUser(user_id, name, email, type, pool);
    expectUserToMatch(createdUser, { user_id, name, email, user_type: type });
  });

  test("Test ID: 1.2 - Valid input: Create osl user with valid name, email and id", async () => {
    const user_id = "osl01";
    const name = "OSL User";
    const email = "osl_user@example.com";
    const type = "osl";
    const createdUser = await createUser(user_id, name, email, type, pool);
    expectUserToMatch(createdUser, { user_id, name, email, user_type: type });
  });

  test("Test ID: 1.3 - Valid input: Create exco user with valid name, email and id", async () => {
    const user_id = "exco01";
    const name = "EXCO User";
    const email = "exco_user@example.com";
    const type = "exco";
    const createdUser = await createUser(user_id, name, email, type, pool);
    expectUserToMatch(createdUser, { user_id, name, email, user_type: type });
  });

  // Incorrect input cases
  test("Test ID: 2.1 - Missing name: Attempt to create user without providing a name", async () => {
    const user_id = "user01";
    const name = "";
    const email = "test@example.com";
    const type = "exco";
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Name must be provided"
    );
  });

  test("Test ID: 2.2 - Missing email: Attempt to create user without providing an email", async () => {
    const user_id = "user01";
    const name = "User";
    const email = "";
    const type = "exco";
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 2.3 - Invalid email format: Attempt to create user with an incorrect email format", async () => {
    const user_id = "user01";
    const name = "User";
    const email = "invalid_email";
    const type = "exco";
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 2.4 - Missing user_id: Attempt to create user without providing an id", async () => {
    const user_id = "";
    const name = "User";
    const email = "user@example.com";
    const type = "exco";
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "User ID must be provided"
    );
  });

  test("Test ID: 2.5 - Invalid user_type: Attempt to create user with an invalid type", async () => {
    const user_id = "user01";
    const name = "User";
    const email = "user@example.com";
    const type = "invalid";
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Invalid user type. Must be 'root', 'osl', or 'exco'"
    );
  });

  // Special cases
  test("Test ID: 3.1 - Duplicate entry: Attempt to create user with an existing id, name, email, and type combination", async () => {
    const user_id = "user01";
    const name = "User";
    const email = "user@example.com";
    const type = "exco";
    const firstCreatedUser = await createUser(user_id, name, email, type, pool);
    expectUserToMatch(firstCreatedUser, {
      user_id,
      name,
      email,
      user_type: type,
    });
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Duplicate entry"
    );
  });

  test("Test ID: 3.2 - Duplicate entry: Attempt to create user with an existing id, name, email, and type combination", async () => {
    const user_id = "user01";
    const name = "User 1";
    const email = "user@example.com";
    const type = "exco";

    // Create first user
    const firstCreatedUser = await createUser(user_id, name, email, type, pool);
    expectUserToMatch(firstCreatedUser, {
      user_id: user_id,
      name: name,
      email: email,
      user_type: type,
    });

    // Attempt to create second user with same id, name, email, and type
    await expect(createUser(user_id, name, email, type, pool)).rejects.toThrow(
      "Duplicate entry"
    );
  });

  afterAll(async () => {
    await deleteFromTables(pool);
    await pool.end();
  });
});
