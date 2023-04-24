import React, { useState } from 'react';
import MethodInput from './MethodInput';
import MethodsList from './MethodsList';

function ContractMethods({ contract, onExecute, selectedAccount}) {
  const methods = contract.abi.filter(
    (item) => item.type === 'function' && item.stateMutability !== 'view'
  );

  const [methodsList, setMethodsList] = useState([]);

  const handleAdd = (methodName, inputs, etherAmount) => {
    const method = {
      name: methodName,
      inputs,
      etherAmount,
      contract
    };

    setMethodsList([...methodsList, method]);
  };


  const handleDelete = (methodName) => {
    setMethodsList(methodsList.filter((method) => method.name !== methodName));
  };

  const handleRunAll = () => {
    methodsList.forEach((method) => {
      onExecute(method.contract, method.name, method.inputs, selectedAccount, method.etherAmount);
    });

    // const interval = setInterval(() => {
    //     methodsList.forEach((method) => {
    //       onExecute(method.contract, method.name, method.inputs, selectedAccount);
    //     });
    //   }, 1000);
  
    //   setTimeout(() => {
    //     clearInterval(interval);
    //   }, runTime * 1000);
  };

  return (
    <div>
      {methods.map((method) => (
        <MethodInput key={method.name} method={method} onAdd={handleAdd} />
      ))}
      <MethodsList
        methods={methodsList}
        onDelete={handleDelete}
        onRunAll={handleRunAll}
      />
    </div>
  );
}

export default ContractMethods;