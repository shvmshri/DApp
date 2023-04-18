// import React from 'react';
// import MethodListItem from './MethodListItem';

// function MethodsList({ methods, onDelete, onRunAll }) {
//   return (
//     <div>
//       <h2>Methods List</h2>
//       {methods.map((method, index) => (
//         <MethodListItem key={index} method={method} onDelete={onDelete} />
//       ))}
//       <button onClick={onRunAll}>Run All</button>
//     </div>
//   );
// }

// export default MethodsList


import React from 'react';
import MethodListItem from './MethodListItem';

function MethodsList({ methods, onDelete, onRunAll }) {
  return (
    <div>
      <h2>Methods List</h2>
      {methods.map((method, index) => (
        <div key={index}>
          <MethodListItem method={method} onDelete={onDelete} />
          <div>Inputs:</div>
          {Object.entries(method.inputs).map(([key, value]) => (
            <div key={key}>
              {key}: {value.toString()}
            </div>
          ))}
        </div>
      ))}
      <button onClick={onRunAll}>Run All</button>
    </div>
  );
}

export default MethodsList;
