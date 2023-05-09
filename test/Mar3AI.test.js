const chai = require('chai');
const { solidity } = require('ethereum-waffle');
const { constants } = require('@openzeppelin/test-helpers');
const config = require('../env.json');

chai.use(solidity);
const expect = chai.expect;

// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
describe('Mar3AI', () => {
  let Mar3AI;
  let mar3AI;
  let owner, operator, guild, user1, user2, user3;

  beforeEach(async () => {
    [owner, operator, guild, user1, user2, user3] = await ethers.getSigners();

    Mar3AI = await ethers.getContractFactory('Mar3AI');
    mar3AI = await Mar3AI.deploy();
    await mar3AI.deployed();
    console.log(mar3AI.address);
  });

  it('Transfer', async () => {
    mar3AI.connect(owner).transfer(operator.address, 10000000);
  });

});

