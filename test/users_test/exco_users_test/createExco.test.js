const { createEXCO } = require("../../../models/exco_db");
const { createPool, deleteFromTables } = require("./exco_test_utils");

let pool;

describe("createEXCO", () => {
  beforeAll(() => {
    pool = createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Valid input: Inserting a new record with a name and email", async () => {
    const name = "John Loh";
    const email = "jn_loh@example.com";

    const createdUser = await createEXCO(name, email, pool);

    expect(createdUser).toHaveProperty("user_id");
  });

  test("Test ID: 2 - Valid input: Inserting a new record with a different name and email", async () => {
    const name = "John High";
    const email = "jn_high@example.com";

    const createdUser = await createEXCO(name, email, pool);

    expect(createdUser).toHaveProperty("user_id");
  });

  test("Test ID: 3 - Missing name: Trying to insert a record without providing a name", async () => {
    const name = "";
    const email = "test@example.com";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Name must be provided"
    );
  });

  test("Test ID: 4 - Missing email: Trying to insert a record without providing an email", async () => {
    const name = "John Loh";
    const email = "";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 5 - Invalid email format: Trying to insert a record with an invalid email", async () => {
    const name = "John Loh";
    const email = "invalid_email";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 6 - Duplicate entry: Trying to insert a record with an existing name and email combination", async () => {
    const name = "John Loh";
    const email = "jn_loh@example.com";

    const firstCreatedUser = await createEXCO(name, email, pool); // First creation must succeed
    expect(firstCreatedUser).toHaveProperty("user_id");

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Duplicate entry"
    ); // Second creation must fail
  });

  test("Test ID: 7 - Invalid domain: Trying to insert a record with an invalid domain part in the email", async () => {
    const name = "John Loh";
    const email = "jn_loh@invalid";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  afterAll(async () => {
    await pool.end();
  });
});
