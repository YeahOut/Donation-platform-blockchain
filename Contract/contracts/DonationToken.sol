// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Simple ERC20 with 0 decimals for point-like behavior
contract DonationToken is ERC20, Ownable {
    constructor() ERC20("Donation Token", "DNT") Ownable(msg.sender) {}

    function decimals() public pure override returns (uint8) {
        return 0; // integer points
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}


