const { getEXCOs, createEXCO } = require("../../../models/exco_db");
const {
  createPool,
  deleteFromTables,
  expectUserToMatch,
} = require("./exco_test_utils");

let pool;

describe("getEXCOs", () => {
  beforeAll(async () => {
    pool = await createPool();
  });

  beforeEach(async () => {
    await deleteFromTables(pool);
  });

  test("Test ID: 1 - Retrieve all EXCOs from the table", async () => {
    const excoData1 = { name: "John Loh", email: "john_loh@example.com" };
    const excoData2 = { name: "John High", email: "john_high@example.com" };

    const user1 = await createEXCO(excoData1.name, excoData1.email, pool);
    const user2 = await createEXCO(excoData2.name, excoData2.email, pool);

    const result = await getEXCOs(pool);

    // Sort both arrays by 'name' (in case the order of retrieved data is not guaranteed)
    const received = [...result].sort((a, b) => a.name.localeCompare(b.name));
    const expected = [user1, user2].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    expected.forEach((exco, index) => {
      expectUserToMatch(received[index], {
        name: exco.name,
        email: exco.email,
        user_id: exco.user_id,
      });
    });
  });

  test("Test ID: 2 - Empty table: No EXCOs in the table", async () => {
    const result = await getEXCOs(pool);
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    await pool.end();
  });
});
