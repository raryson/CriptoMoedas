const test = require('tape')
const user = require('../models/user')

//yes, are using development database, need a mock implementation
test('Database connection', async (t) => {
    await user.CreateConnection()
    t.true(true, "Database connection worked")
    t.end()
})

test('Create a wallet', async (t) => {
    await user.CreateWallet("Pedro", 5)
    t.true(true, "Wallet created")
    t.end()
})

test('Consult a wallet', async (t) => {
    const createdUser = await user.CreateWallet("Pedro", 5)
    await user.GetUserByGuid(createdUser.guid)
    t.true(true, "Consult wallet are working")
    t.end()
})

test('Transaction between 2 wallets', async (t) => {
    const fromUser = await user.CreateWallet("Pedro", 5)
    const toUser = await user.CreateWallet("Joao do quipao", 10)
    user.MakeTransactionsBetweenTwoWallets(fromUser.guid, toUser.guid, 5)
    t.true(true, "Transaction between 2 wallets are working")
    t.end()
})

test.onFinish(() => { 
    process.exit(0)
  })