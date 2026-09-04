const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const solc = require('solc');

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '';
const RPC_URL = process.env.BLOCKCHAIN_RPC_URL || 'https://ethereum-sepolia.publicnode.com';

function compileContract() {
  const contractPath = path.resolve(__dirname, '..', 'blockchain', 'EvidenceLedger.sol');
  const source = fs.readFileSync(contractPath, 'utf8');

  const input = {
    language: 'Solidity',
    sources: {
      'EvidenceLedger.sol': {
        content: source,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'paris',
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts['EvidenceLedger.sol']['EvidenceLedger'];
  return {
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object,
  };
}

// Contract is already deployed to Sepolia:
// Contract Address: 0x398349BA413F8F27e2bEd00a16d02bBef33ab220
// Etherscan Link: https://sepolia.etherscan.io/address/0x398349BA413F8F27e2bEd00a16d02bBef33ab220
