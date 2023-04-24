import React, { useState } from 'react';

function PublicVariableDisplay({ contract, web3, selectedAccount }) {
 
  const [variableValues, setVariableValues] = useState({});

  const fetchVariableValues = async () => {

    // console.log(contract)
    const contractInstance = new web3.eth.Contract(contract.abi, contract.address);
    // console.log(contract.abi)
    const publicVariables = contract.abi.filter(
      (item) => item.type === 'function' && item.stateMutability === 'view'
    );

    // console.log(publicVariables)
    const fetchedValues = {};

    for (const variable of publicVariables) {
      if (variable.inputs.length === 0) {
        const result = await contractInstance.methods[variable.name]().call();
        fetchedValues[variable.name] = result;
      } else if (variable.inputs.length === 1 && variable.inputs[0].type === 'address') {
        const result = await contractInstance.methods[variable.name](selectedAccount).call();
        fetchedValues[`${variable.name} (${selectedAccount})`] = result;
      }
    }
    setVariableValues(fetchedValues);
  };

  return (
    <div>
      <h3>{contract.name} Public Variables</h3>
      <button onClick={fetchVariableValues}>Show Blockchain State</button>
      <ul>
        {Object.entries(variableValues).map(([key, value]) => (
          <li key={key}>
            {key}: {value.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicVariableDisplay;