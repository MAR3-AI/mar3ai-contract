const { ethers, upgrades } = require('hardhat');

const config = require('../env.json');

const main = async () => {
  const Mar3AI = await ethers.getContractFactory('Mar3AI');
  const mar3AI = await Mar3AI.deploy();
  await mar3AI.deployed();
  console.log(mar3AI.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
