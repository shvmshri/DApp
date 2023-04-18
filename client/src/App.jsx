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
  const [selectedContract, setSelectedContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  const [runTime, setRunTime] = useState(10);

  useEffect(() => {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
  }, []);

  const handleContractSelect = (index) => {
    setSelectedContract(deployedContracts[index]);
  };

  const handleExecute = async (contract, methodName, inputs) => {
    if (!web3) return;

    const contractInstance = new web3.eth.Contract(
      contract.abi,
      contract.address
    );
    const accounts = await web3.eth.getAccounts();
    const method = contractInstance.methods[methodName];

    if (!method) {
      console.error(`Method ${methodName} not found on contract`);
      return;
    }

    const inputValues = Object.values(inputs);
    try {
      await method(...inputValues).send({ from: accounts[0] });
      console.log('Method executed successfully');
    } catch (error) {
      console.error('Error executing method:', error);
    }
  };

  return (
    <div className="App">
      <h1>Contract Explorer</h1>
      <ContractsDropdown
        contracts={deployedContracts}
        onSelect={handleContractSelect}
      />
      {selectedContract && (
        <>

        <div>
            <label htmlFor="runTime">Run Time (seconds): </label>
            <input
              type="number"
              id="runTime"
              value={runTime}
              onChange={(e) => setRunTime(e.target.value)}
            />
          </div>

          <ContractMethods
            contract={selectedContract}
            onExecute={handleExecute}
            runTime = {runTime}
          />
          <PublicVariableDisplay contract={selectedContract} web3={web3} />
        </>
      )}
    </div>
  );

}

export default App;