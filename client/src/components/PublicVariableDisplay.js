import React, { useState } from 'react';

function PublicVariableDisplay({ contract, web3 }) {
  const [variableValues, setVariableValues] = useState({});

  const fetchVariableValues = async () => {
    const contractInstance = new web3.eth.Contract(contract.abi, contract.address);
    const publicVariables = contract.abi.filter(
      (item) => item.type === 'function' && item.stateMutability === 'view'
    );

    const fetchedValues = {};
    for (const variable of publicVariables) {
      const result = await contractInstance.methods[variable.name]().call();
      fetchedValues[variable.name] = result;
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