import Web3 from 'web3';

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Check for injected web3 (Mist/MetaMask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        // Request account access
        await window.ethereum.enable();

        resolve(web3);
      } catch (error) {
        reject(new Error('User denied account access.'));
      }
    }
    // Check for connection to a local Ganache instance
    else if (window.web3) {
      console.log('Injected web3 detected.');
      resolve(new Web3(window.web3.currentProvider));
    }
    // No web3 instance injected, use Local web3 provider
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      resolve(web3);
    }
  });

export default getWeb3;
