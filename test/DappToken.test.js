var DappToken = artifacts.require("DappToken");

contract('DappToken', (accounts) => {
  let dapptoken

  before(async () => {
    dapptoken = await DappToken.deployed();
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dapptoken.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('Initializes the contract with the correct values', async () => {
      const name = await dapptoken.name();
      const symbol = await dapptoken.symbol();
      const standard = await dapptoken.standard();
      assert.equal(name, 'DApp Token');
      assert.equal(symbol, 'DAPP');
      assert.equal(standard, 'DApp Token v1.0');
    })

    it('Sets the total supply upon deployment', async () => {
      const totalSupply = await dapptoken.totalSupply()
      assert.equal(totalSupply.toNumber(), 30000000)
    })

    it('It allocates the inistial supply to the admin', async () => {
      const adminBlance = await dapptoken.balanceOf(accounts[0]);
      assert.equal(adminBlance.toNumber(), 30000000)
    })

    it('Transfert token ownership', async () => {
      await dapptoken.transfer.call(accounts[1], 999999999999999).then(assert.fail).catch(function (error) {
        assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
        return dapptoken.transfer.call(accounts[1], 250000, { from: accounts[0] });
      }).then(function (success) {
        assert.equal(success, true, 'it returns true');
        return dapptoken.transfer(accounts[1], 250000, { from: accounts[0] });
      }).then(function (receipt) {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
        assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
        return dapptoken.balanceOf(accounts[1]);
      }).then(function (balance) {
        assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
        return dapptoken.balanceOf(accounts[0]);
      }).then(function (balance) {
        assert.equal(balance.toNumber(), 29750000, 'deducts the amount from the sending account');
      });
    })
  })

  it('approves tokens for delegated transfer', async () => {
    dapptoken.approve.call(accounts[1], 100).then(function (success) {
      assert.equal(success, true, 'it returns true');
      return dapptoken.approve(accounts[1], 100, { from: accounts[0] });
    }).then(function (receipt) {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
      assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
      assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
      assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
      return dapptoken.allowance(accounts[0], accounts[1]);
    }).then(function (allowance) {
      assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated trasnfer');
    });
  });
})
