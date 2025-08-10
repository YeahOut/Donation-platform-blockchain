// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DonationPool is Ownable {
    IERC20 public immutable token;
    uint256 public totalDonated;
    uint256 public uniqueDonors;
    mapping(address => bool) public hasDonated; // direct wallet donors
    mapping(bytes32 => bool) public hasDonatedById; // custodial users (hashed id)

    event Donated(address indexed donor, uint256 amount, uint256 newTotal);
    event DonatedFor(bytes32 indexed donorHash, uint256 amount, uint256 newTotal);

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function donate(uint256 amount) external {
        require(amount > 0, "amount=0");
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
        totalDonated += amount;
        if (!hasDonated[msg.sender]) {
            hasDonated[msg.sender] = true;
            uniqueDonors += 1;
        }
        emit Donated(msg.sender, amount, totalDonated);
    }

    // Custodial path: owner records a donation on behalf of a user (identified by a hashed id)
    function recordDonationFor(bytes32 donorHash, uint256 amount) external onlyOwner {
        require(amount > 0, "amount=0");
        totalDonated += amount;
        if (!hasDonatedById[donorHash]) {
            hasDonatedById[donorHash] = true;
            uniqueDonors += 1;
        }
        emit DonatedFor(donorHash, amount, totalDonated);
    }
}


