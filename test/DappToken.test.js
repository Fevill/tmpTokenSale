var DappToken = artifacts.require("DappToken");

contract('DappToken',(accounts)=>{
    let dapptoken

    before(async()=>{
        dapptoken = await DappToken.deployed();
    })

    describe('deployment', async ()=>{
       it('deploys successfully', async()=>{
           const address = await dapptoken.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
       }) 

       it('Sets the total supply upon deployment', async ()=>{
           const totalSupply = await dapptoken.totalSupply()
           assert.equal(totalSupply.toNumber(), 30000000)
       })
    })
})