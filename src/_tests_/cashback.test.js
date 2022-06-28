const cash = require('../business/cashbackBusiness')

test('accumulatedValue value', async () => {
  const res = await cash.accumulatedValue(45086221862)
  await expect(res).not.toBeNull()
})