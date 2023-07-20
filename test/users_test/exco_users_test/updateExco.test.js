const { getEXCO, createEXCO, updateEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("updateEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Valid inputs: Update EXCO record by user_id", async () => {
    const user = await createEXCO("Test User", "test@test.com", pool);
    const userId = user.user_id; // Assuming 'createEXCO' returns a user object with a 'user_id' field
    const updatedUser = await updateEXCO(
      userId,
      "Updated Name",
      "updated@example.com",
      pool
    );
    expectUserToMatch(updatedUser, {
      user_id: userId,
      name: "Updated Name",
      email: "updated@example.com",
      is_deleted: false,
      // if there are more fields in the returned user, add them here
    });
  });

  test("Test ID: 2 - Invalid user_id: Update EXCO record by non-existent ID", async () => {
    await expect(
      updateEXCO(999, "Updated Name", "updated@example.com", pool)
    ).rejects.toThrow();
  });

  test("Test ID: 3 - Non-integer user_id: Update EXCO record by string", async () => {
    await expect(
      updateEXCO("abc", "Updated Name", "updated@example.com", pool)
    ).rejects.toThrow();
  });

  test("Test ID: 4 - Invalid email format: Update EXCO with an invalid email format", async () => {
    const userId = await createEXCO("Test User", "test@test.com", pool);
    await expect(
      updateEXCO(userId, "Updated Name", "invalidemail", pool)
    ).rejects.toThrow();
  });

  test("Test ID: 5 - No inputs: Update EXCO record without providing inputs", async () => {
    await expect(updateEXCO(null, null, null, pool)).rejects.toThrow();
  });

  test("Test ID: 6 - Missing name/email: Update EXCO record without providing name/email", async () => {
    const userId = await createEXCO("Test User", "test@test.com", pool);
    await expect(updateEXCO(userId, null, null, pool)).rejects.toThrow();
  });

  afterAll(async () => {
    await pool.end();
  });
});
