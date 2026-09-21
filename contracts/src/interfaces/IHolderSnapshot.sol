// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Proposed snapshot commitment surface. Hash construction is not finalized.
interface IHolderSnapshot {
    event SnapshotPublished(uint256 indexed epochId, uint256 snapshotBlock, bytes32 root);

    /// @notice Commitment and block reference for an epoch's proposed holder snapshot.
    function snapshot(uint256 epochId) external view returns (uint256 snapshotBlock, bytes32 root);
}
