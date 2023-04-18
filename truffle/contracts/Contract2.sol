// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Contract2 {
    uint256 public counter;

    constructor(uint256 initialCounter) {
        counter = initialCounter;
    }

    function increment() public {
        counter++;
    }

    function decrement() public {
        counter--;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
}
