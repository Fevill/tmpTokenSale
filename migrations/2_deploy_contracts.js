const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale");

module.exports = function (deployer) {
  deployer.deploy(DappToken, 30000000).then(function () {
    //Token price is 0.004 ETH
    var _tokenPrice = 4000000000000000;
    return deployer.deploy(DappTokenSale,  DappToken.address,_tokenPrice);
  });
};

