// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Contract1 {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
