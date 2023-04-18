import React from 'react';

// to display methods in the user-maintained list:
function MethodListItem({ method, onDelete }) {
  return (
    <div>
      {method.name}
      <button onClick={() => onDelete(method.name)}>Delete</button>
    </div>
  );
}

export default MethodListItem