// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Proposed read/event surface only. No deployed implementation is implied.
interface IComputeTreasury {
    /// @dev Amount is in the base units of asset, never assumed to be USD cents.
    event RevenueRecorded(bytes32 indexed receiptId, address indexed asset, uint256 amount);
    event EpochBudgetPublished(uint256 indexed epochId, address indexed asset, uint256 budget);

    /// @notice Budget assigned to an epoch for a particular asset.
    function epochBudget(uint256 epochId, address asset) external view returns (uint256);
}
