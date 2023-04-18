const Contract1 = artifacts.require("Contract1");
const Contract2 = artifacts.require("Contract2");
const Contract3 = artifacts.require("Contract3");

module.exports = function (deployer) {
  deployer.deploy(Contract1, "Hello, world!");
  deployer.deploy(Contract2, 0);
  deployer.deploy(Contract3, 10, 20);
};
