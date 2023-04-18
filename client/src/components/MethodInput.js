import React, { useState, useEffect } from 'react';

function generateRandomValue(type) {
    if (type.startsWith('uint')) {
      return Math.floor(Math.random() * 1000);
    } else if (type === 'address') {
      return '0x' + Math.floor(Math.random() * 1000000000).toString(16).padStart(40, '0');
    } else if (type === 'bool') {
      return Math.random() < 0.5;
    } else if (type === 'string') {
      return Math.random().toString(36).substring(2);
    } else {
      return '';
    }
  }



function MethodInput({ method, onAdd }) {
  
  const randomInputs = {};

  method.inputs.forEach((input) => {
    randomInputs[input.name] = generateRandomValue(input.type);
  });

  const handleAdd = () => {
    onAdd(method.name, randomInputs);
  };

  return (
    <div>
      <h3>{method.name}</h3>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

// function MethodInput({ method, onAdd }) {
//     const [randomInputs, setRandomInputs] = useState({});
  
//     useEffect(() => {
//       const newRandomInputs = {};
  
//       method.inputs.forEach((input) => {
//         newRandomInputs[input.name] = generateRandomValue(input.type);
//       });
  
//       setRandomInputs(newRandomInputs);
//     }, [method]);
  
//     const handleAdd = () => {
//       onAdd(method.name, randomInputs);
//     };
  
//     return (
//       <div>
//         <h3>{method.name}</h3>
//         {Object.entries(randomInputs).map(([key, value]) => (
//           <div key={key}>
//             {key}: {value.toString()}
//           </div>
//         ))}
//         <button onClick={handleAdd}>Add</button>
//       </div>
//     );
//   }


export default MethodInput