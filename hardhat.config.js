require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@openzeppelin/hardhat-upgrades');
require('@nomiclabs/hardhat-web3');

const config = require('./env.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  zksolc: {
    version: "1.3.1",
    compilerSource: "binary",
    settings: {},
  },
  networks: {
    ganache: {
      url: 'http://127.0.0.1:8545',
    },
    local: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    goerli: {
      url: config.GOERLI_RPC,
      chainId: config.GOERLI_CHAIN_ID,
      accounts: [
        `ba3d5985e1722231d41d91d4eab703f5f6c1cdefa308393f19ed45043f535067`,
      ],
    },
    testnet: {
      url: config.TESTNET_RPC,
      chainId: config.TESTNET_CHAIN_ID,
      accounts: [
        `e720ffd49ef136b1efcf6bfc747a5e2a749fcce1bcff3a8d2597fdf6d7c9c888`,
      ],
    },
    mainnet: {
      url: config.MAINNET_RPC,
      chainId: config.MAINNET_CHAIN_ID,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: config.ETHERSCAN_API_KEY,
  },
};
