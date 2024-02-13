import config from 'config'; // Airdrop config
import keccak256 from 'keccak256'; // Keccak256 hashing
import MerkleTree from 'merkletreejs'; // MerkleTree.js
import { ethers } from 'ethers'; // Ethers

/**
 * Generate Merkle Tree leaf from address and value
 * @param {string} address of airdrop claimee
 * @param {string} value of airdrop tokens to claimee
 * @returns {Buffer} Merkle Tree node
 */
function generateLeaf(address: string, value: string): Buffer {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.solidityPackedKeccak256(['address', 'uint256'], [address, value]).slice(2),
    'hex',
  );
}

// Setup merkle tree
const merkleTree = new MerkleTree(
  // Generate leafs
  Object.entries(config.airdrop).map(([address, tokens]) =>
    generateLeaf(
      ethers.getAddress(address),
      ethers.parseUnits(tokens.toString(), config.decimals).toString(),
    ),
  ),
  // Hashing function
  keccak256,
  { sortPairs: true },
);

export function getProof(address: string, value: string): string[] {
  // Generate hashed leaf from address
  const leaf: Buffer = generateLeaf(
    ethers.getAddress(address),
    ethers.parseUnits(value, config.decimals).toString(),
  );
  // Generate airdrop proof
  return merkleTree.getHexProof(leaf);
}
