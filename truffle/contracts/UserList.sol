// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract UserList {
  struct User {
    uint id;
    string name;
  }

  mapping(uint => User) public users;
  uint public userCount;

  function addUser(string memory _name) public {
    userCount++;
    users[userCount] = User(userCount, _name);
  }

  function updateUser(uint _id, string memory _name) public {
    require(_id <= userCount, "User not found");
    users[_id].name = _name;
  }
}
