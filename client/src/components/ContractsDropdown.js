import React from 'react';

function ContractsDropdown({ contracts, onSelect }) {
  console.log(contracts)
  return (
  
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a contract</option>
      {contracts.map((contract, index) => (
        <option key={index} value={index}>
          {contract.name}
        </option>
      ))}
    </select>
  );
}

export default ContractsDropdown;