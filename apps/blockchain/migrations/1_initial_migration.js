const ethTicket = artifacts.require("./ETHTickets.sol");

module.exports = function (deployer) {
  deployer.deploy(ethTicket);
};
