const Contract1 = artifacts.require("Contract1");
const Contract2 = artifacts.require("Contract2");
const Contract3 = artifacts.require("Contract3");
const EtherStore = artifacts.require("EtherStore");
const Attack = artifacts.require("Attack")


module.exports = async function (deployer) {
  deployer.deploy(Contract1, "Hello, world!");
  deployer.deploy(Contract2, 0);
  deployer.deploy(Contract3, 10, 20);
  // deployer.deploy(EtherStore,0)

  await deployer.deploy(EtherStore);
  const etherStoreInstance = await EtherStore.deployed();
  await deployer.deploy(Attack, etherStoreInstance.address);
 
};
