/* global artifacts, web3 */

const Casino = artifacts.require("Casino");

module.exports = function(deployer) {
  // TODO: Implementation
  const minimumBet = "0.1";
  const maxNumberOfBets = "2";
  const minimumBetEthers = web3.utils.toWei(minimumBet, "ether");

  deployer.deploy(Casino, minimumBetEthers, maxNumberOfBets, {
    gas: 5000000
  });
};
