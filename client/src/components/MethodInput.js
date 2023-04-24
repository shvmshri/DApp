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
    const [inputs, setInputs] = useState({});
    const [inputType, setInputType] = useState("random"); // new state for input type

    const [etherAmount, setEtherAmount] = useState(0); //select ether to send in transaction
  
    useEffect(() => {
      if (inputType === "random") {
        const newRandomInputs = {};
  
        method.inputs.forEach((input) => {
          newRandomInputs[input.name] = generateRandomValue(input.type);
        });
  
        setInputs(newRandomInputs);
      }
    }, [method, inputType]);
  
    const handleAdd = () => {
      onAdd(method.name, inputs, etherAmount);
    };
  
    const handleInputChange = (name, value) => {
      setInputs({ ...inputs, [name]: value });
    };
  
    const renderInputs = () => {
      if (inputType === "random") {
        return Object.entries(inputs).map(([key, value]) => (
          <div key={key}>
            {key}: {value.toString()}
          </div>
        ));
      } else {
        return method.inputs.map((input) => (
          <div key={input.name}>
            <label>{input.name}:</label>
            <input
              type="text"
              value={inputs[input.name]}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
            />
          </div>
        ));
      }
    };
  
    return (
      <div>
        <h3>{method.name}</h3>
        {renderInputs()}
        <div>
          <label>
            <input
              type="radio"
              name={method.name + "_inputType"}
              value="random"
              checked={inputType === "random"}
              onChange={(e) => setInputType(e.target.value)}
            />
            Random Input
          </label>
          <label>
            <input
              type="radio"
              name={method.name + "_inputType"}
              value="user"
              checked={inputType === "user"}
              onChange={(e) => setInputType(e.target.value)}
            />
            User Provided Input
          </label>
        </div>


      {/* setting ether amount */}
      <div>
        <label htmlFor="etherAmount">Ether Amount: </label>
        <input
          type="number"
          id="etherAmount"
          value={etherAmount}
          onChange={(e) => setEtherAmount(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>


        <button onClick={handleAdd}>Add</button>
      </div>
    );
  }
  
  export default MethodInput;

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
