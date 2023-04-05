// import React, { useState, useEffect } from 'react';
// import { useEth } from './contexts/EthContext';
// import UserListContract from './contracts/UserList.json';

// import './App.css';

// const App = () => {
//   const eth = useEth();
//   const web3 = eth?.web3;
//   const accounts = eth?.accounts;
//   const [contract, setContract] = useState(null);
//   const [users, setUsers] = useState({});
//   const [userCount, setUserCount] = useState(0);
//   const [newName, setNewName] = useState('');
//   const [updateId, setUpdateId] = useState('');
//   const [updateName, setUpdateName] = useState('');
//   // ... rest of the state variables and functions

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const networkId = await web3.eth.net.getId();
//         console.log(networkId)
//         const deployedNetwork = UserListContract.networks[networkId];
//         const instance = new web3.eth.Contract(
//           UserListContract.abi,
//           deployedNetwork && deployedNetwork.address,
//         );

//         setContract(instance);
//         loadUsers(instance);
//       } catch (error) {
//         alert('Failed to load accounts or contract.');
//         console.error(error);
//       }
//     };

//     if (web3 && accounts) {
//       init();
//     }
//   }, [web3, accounts]);

//   // ... rest of the component

//   const loadUsers = async (instance) => {
//     const userCount = await instance.methods.userCount().call();

//     let users = {};
//     for (let i = 1; i <= userCount; i++) {
//       const user = await instance.methods.users(i).call();
//       users[user.id] = user;
//     }

//     setUsers(users);
//     setUserCount(userCount);
//   };

//   const addUser = async () => {
//     await contract.methods.addUser(newName).send({ from: accounts[0] });
//     loadUsers(contract);
//   };

//   const updateUser = async () => {
//     await contract.methods.updateUser(updateId, updateName).send({ from: accounts[0] });
//     loadUsers(contract);
//   };

//   return (
//     <div className="App">
//       <h1>User List dApp</h1>
//       <hr />
//       <h2>Add User</h2>
//       <input
//         value={newName}
//         onChange={(e) => setNewName(e.target.value)}
//         placeholder="Enter user name"
//       />
//       <button onClick={addUser}>Add User</button>
//       <hr />
//       <h2>Update User</h2>
//       <input
//         value={updateId}
//         onChange={(e) => setUpdateId(e.target.value)}
//         placeholder="Enter user ID"
//       />
//       <input
//         value={updateName}
//         onChange={(e) => setUpdateName(e.target.value)}
//         placeholder="Enter new user name"
//       />
//       <button onClick={updateUser}>Update User</button>
//       <hr />
//       <h2>User List</h2>
//       <ul>
//         {Object.values(users).map((user) => (
//           <li key={user.id}>
//             ID: {user.id} - Name: {user.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

// }

// export default App;



import React, { useState, useEffect } from 'react';
import UserListContract from './contracts/UserList.json';
import getWeb3 from './getWeb3';

import './App.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [users, setUsers] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [newName, setNewName] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        
        const networkId = await web3.eth.net.getId();
        console.log(networkId)

        console.log(UserListContract.networks)
        const deployedNetwork = UserListContract.networks[5777];
        console.log(deployedNetwork)
        const instance = await new web3.eth.Contract(
          UserListContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
          console.log(instance)
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

        loadUsers(instance);
      } catch (error) {
        alert('Failed to load web3, accounts, or contract.');
        console.error(error);
      }
    };

    init();
  }, []);

  const loadUsers = async (instance) => {
    const userCount = await instance.methods.userCount().call();

    let users = {};
    for (let i = 1; i <= userCount; i++) {
      const user = await instance.methods.users(i).call();
      users[user.id] = user;
    }

    setUsers(users);
    setUserCount(userCount);
  };

  const addUser = async () => {
    await contract.methods.addUser(newName).send({ from: accounts[0] });
    loadUsers(contract);
  };

  const updateUser = async () => {
    await contract.methods.updateUser(updateId, updateName).send({ from: accounts[0] });
    loadUsers(contract);
  };

  return (
    <div className="App">
      <h1>User List dApp</h1>
      <hr />
      <h2>Add User</h2>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={addUser}>Add User</button>
      <hr />
      <h2>Update User</h2>
      <input
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
        placeholder="Enter user ID"
      />
      <input
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
        placeholder="Enter new user name"
      />
      <button onClick={updateUser}>Update User</button>
      <hr />
      <h2>User List</h2>
      <ul>
        {Object.values(users).map((user) => (
          <li key={user.id}>
            ID: {user.id} - Name: {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
