// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Mar3AI is ERC20, Ownable {
    constructor() ERC20("Mar3AI", "MAR3AI") {
        _mint(_msgSender(), 1000000000 ether);
    }
}
