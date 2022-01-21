require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const { INFURA_MUMBAI, INFURA_MAINNET, PRIVATEKEY } = process.env;
const privateKey = PRIVATEKEY.toString().trim();
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
   
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_MUMBAI}`,
      accounts: [privateKey],
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_MAINNET}`,
      accounts: [privateKey],
    },
  },

  paths: {
    artifacts: './src/artifacts',
  },

  solidity: {
    version: "0.8.4",
   
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      
    },
  },
};
