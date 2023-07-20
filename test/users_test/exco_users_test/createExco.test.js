const { createEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("createEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Valid input: Create EXCO with valid name and email", async () => {
    const name = "John Loh";
    const email = "jn_loh@example.com";
    const createdUser = await createEXCO(name, email, pool);
    expectUserToMatch(createdUser, { name, email });
  });

  test("Test ID: 2 - Valid input: Create another EXCO with a different name and email", async () => {
    const name = "John High";
    const email = "jn_high@example.com";
    const createdUser = await createEXCO(name, email, pool);
    expectUserToMatch(createdUser, { name, email });
  });

  test("Test ID: 3 - Missing name: Attempt to create EXCO without providing a name", async () => {
    const name = "";
    const email = "test@example.com";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Name must be provided"
    );
  });

  test("Test ID: 4 - Missing email: Attempt to create EXCO without providing an email", async () => {
    const name = "John Loh";
    const email = "";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 5 - Invalid email format: Attempt to create EXCO with an incorrect email format", async () => {
    const name = "John Loh";
    const email = "invalid_email";

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Invalid email format"
    );
  });

  test("Test ID: 6 - Duplicate entry: Attempt to create EXCO with an existing name and email combination", async () => {
    const name = "John Loh";
    const email = "jn_loh@example.com";

    const firstCreatedUser = await createEXCO(name, email, pool);
    expectUserToMatch(firstCreatedUser, { name, email });

    await expect(createEXCO(name, email, pool)).rejects.toThrow(
      "Duplicate entry"
    );
  });

  test("Test ID: 7 - Invalid domain in email: Attempt to create EXCO with invalid domain in email", async () => {
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
