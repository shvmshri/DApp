import React, { useState } from 'react';
import MethodInput from './MethodInput';
import MethodsList from './MethodsList';

function ContractMethods({ contract, onExecute, runTime}) {
  const methods = contract.abi.filter(
    (item) => item.type === 'function' && item.stateMutability !== 'view'
  );

  const [methodsList, setMethodsList] = useState([]);

  const handleAdd = (methodName, inputs) => {
    const method = {
      name: methodName,
      inputs,
      contract
    };

    setMethodsList([...methodsList, method]);
  };


  const handleDelete = (methodName) => {
    setMethodsList(methodsList.filter((method) => method.name !== methodName));
  };

  const handleRunAll = () => {
    // methodsList.forEach((method) => {
    //   onExecute(method.contract, method.name, method.inputs);
    // });

    const interval = setInterval(() => {
        methodsList.forEach((method) => {
          onExecute(method.contract, method.name, method.inputs);
        });
      }, 1000);
  
      setTimeout(() => {
        clearInterval(interval);
      }, runTime * 1000);
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