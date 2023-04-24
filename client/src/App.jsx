// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import "./App.css";
// import ContractInteraction from "./components/ContractInteraction";
// import deployedContracts from "./deployedContracts.json";

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [ABIs, setABIs] = useState({});

//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);
//         try {
//           await window.ethereum.request({ method: "eth_requestAccounts" });
//           const accounts = await web3Instance.eth.getAccounts();
//           setAccounts(accounts);
//         } catch (err) {
//           console.error("Error connecting to Metamask:", err);
//         }
//       } else {
//         console.error("Metamask not found");
//       }
//     };
//     initWeb3();
//   }, []);

//   useEffect(() => {
//     if (deployedContracts && Object.keys(deployedContracts).length > 0) {
//       const contractABIs = {};
//       for (const contractType in deployedContracts) {
//         contractABIs[contractType] = deployedContracts[contractType].abi;
//       }
//       setABIs(contractABIs);
//     }
//   }, []);

//   const handleContractSelection = (e) => {
//     const contractAddress = e.target.value;
//     if (contractAddress === "") {
//       setSelectedContract(null);
//     } else {
//       const contractData = deployedContracts[e.target.name].find(
//         (contract) => contract.contractAddress === contractAddress
//       );
//       setSelectedContract(contractData);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Remix-like IDE</h1>
//       <h2>Select a contract to interact with:</h2>
//       {Object.keys(deployedContracts).map((contractType) => (
//         <div key={contractType}>
//           <h3>{contractType}</h3>
//           <select name={contractType} onChange={handleContractSelection}>
//             <option value="">Select a contract instance</option>
//             {deployedContracts[contractType].map((contract) => (
//               <option key={contract.contractAddress} value={contract.contractAddress}>
//                 {contract.contractAddress}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//       {selectedContract && (
//         <ContractInteraction web3={web3} contractData={selectedContract} ABIs={ABIs} />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import "./App.css";
import ContractsDropdown from './components/ContractsDropdown';
import ContractMethods from './components/ContractMethods';
import deployedContracts from './deployedContracts.json';
import PublicVariableDisplay from './components/PublicVariableDisplay';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
      }
    } else {
      console.error("MetaMask not found");
    }
  };

  const [selectedContract, setSelectedContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  //To handle multiple accounts
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);


  // const [runTime, setRunTime] = useState(10);

  useEffect(() => {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
  }, []);

  //To handle multiple accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      if (web3 && isConnected) {
        const fetchedAccounts = await web3.eth.getAccounts();
        setAccounts(fetchedAccounts);
      }
    };
    fetchAccounts();
  }, [web3,isConnected]);

  console.log(accounts)

  const handleAccountSelect = (index) => {
    setSelectedAccount(accounts[index]);
  };

/////////

  const handleContractSelect = (index) => {
    setSelectedContract(deployedContracts[index]);
  };

  const handleExecute = async (contract, methodName, inputs, selectedAccount, etherAmount) => {
    if (!web3) return;

    
    // const accounts = await web3.eth.getAccounts();
    // console.log("accounts:")
    // console.log(accounts)
    // const method = contractInstance.methods[methodName];

    // if (!method) {
    //   console.error(`Method ${methodName} not found on contract`);
    //   return;
    // }

    // const inputValues = Object.values(inputs);
    // try {
    //   await method(...inputValues).send({ from: selectedAccount });
    //   console.log('Method executed successfully');
    // } catch (error) {
    //   console.error('Error executing method:', error);
    // }


///////////

const contractInstance = new web3.eth.Contract(contract.abi, contract.address);
  const method = contractInstance.methods[methodName](...Object.values(inputs));
  const gas = await method.estimateGas({ from: selectedAccount, value: web3.utils.toWei(etherAmount, 'ether') });

  const transactionParameters = {
    to: contract.address,
    from: selectedAccount,
    gas: web3.utils.toHex(gas),
    gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
    data: method.encodeABI(),
    value: web3.utils.toHex(web3.utils.toWei(etherAmount, 'ether')),
  };

  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });

  };

  return (
    <div className="App">


{!isConnected && (
<button onClick={connectToMetaMask}>Connect to MetaMask</button>
)}


{accounts.length > 0 && (
  <div>
    <h3>Select an account</h3>
    <select onChange={(e) => handleAccountSelect(e.target.value)}>
      <option value="">Select an account</option>
      {accounts.map((account, index) => (
        <option key={index} value={index}>
          {account}
        </option>
      ))}
    </select>
  </div>
)}

      <h1>Contract Explorer</h1>
      <ContractsDropdown
        contracts={deployedContracts}
        onSelect={handleContractSelect}
      />
      {selectedContract && selectedAccount && (
        <>

        {/* <div>
            <label htmlFor="runTime">Run Time (seconds): </label>
            <input
              type="number"
              id="runTime"
              value={runTime}
              onChange={(e) => setRunTime(e.target.value)}
            />
          </div> */}

          <ContractMethods
            contract={selectedContract}
            onExecute={handleExecute}
            selectedAccount={selectedAccount}
          />
          <PublicVariableDisplay contract={selectedContract} web3={web3} selectedAccount={selectedAccount} />
        </>
      )}
    </div>
  );

}

export default App;