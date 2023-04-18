// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Contract3 {
    uint256 public minValue;
    uint256 public maxValue;

    constructor(uint256 _minValue, uint256 _maxValue) {
        require(_minValue < _maxValue, "minValue must be smaller than maxValue");
        minValue = _minValue;
        maxValue = _maxValue;
    }

    function setRange(uint256 _minValue, uint256 _maxValue) public {
        require(_minValue < _maxValue, "minValue must be smaller than maxValue");
        minValue = _minValue;
        maxValue = _maxValue;
    }

    function isWithinRange(uint256 value) public view returns (bool) {
        return value >= minValue && value <= maxValue;
    }
}