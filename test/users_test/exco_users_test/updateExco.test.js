const { getEXCO, createEXCO, updateEXCO } = require("../../../models/exco_db");
const { createPool, deleteFromTables } = require("./exco_test_utils");

let pool;

describe("updateEXCO", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Valid inputs: Update EXCO record by user_id", async () => {
    const newExco = await createEXCO("Test User", "test@test.com", pool);
    await updateEXCO(
      newExco.user_id,
      "Updated Name",
      "updated@example.com",
      pool
    );
    const result = await getEXCO(newExco.user_id, pool);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      user_id: newExco.user_id,
      name: "Updated Name",
      email: "updated@example.com",
    });
  });

  test("Invalid user_id: Update EXCO record by non-existent ID", async () => {
    await expect(
      updateEXCO(999, "Updated Name", "updated@example.com", pool)
    ).rejects.toThrow();
  });

  test("Non-integer user_id: Update EXCO record by string", async () => {
    await expect(
      updateEXCO("abc", "Updated Name", "updated@example.com", pool)
    ).rejects.toThrow();
  });

  test("Invalid email format: Update EXCO with an invalid email format", async () => {
    const newExco = await createEXCO("Test User", "test@test.com", pool);
    await expect(
      updateEXCO(newExco.user_id, "Updated Name", "invalidemail", pool)
    ).rejects.toThrow();
  });

  test("No inputs: Update EXCO record without providing inputs", async () => {
    await expect(updateEXCO(null, null, null, pool)).rejects.toThrow();
  });

  test("Missing name/email: Update EXCO record without providing name/email", async () => {
    const newExco = await createEXCO("Test User", "test@test.com", pool);
    await expect(
      updateEXCO(newExco.user_id, null, null, pool)
    ).rejects.toThrow();
  });

  afterAll(async () => {
    await pool.end();
  });
});
