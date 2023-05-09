const Web3 = require('web3');
// const HERALottery = require('../artifacts/contracts/HERALottery.sol/HERALottery.json');
const ExchangeV1 = require('../artifacts/contracts/exchange/GafinExchangeV1.sol/GafinExchangeV1.json');

const config = require('../env.json');

// const web3 = new Web3("https://zksync2-testnet.zksync.dev");

const walletAddress = '0x9f13E3eAF83Fb3124FB49F6DC11C5F2fa8521dEf';
const contractAddress = '0x452E373547Cd8a958b931275634a914A8D9554F6';

// const contract = new web3.eth.Contract(HERALottery.abi, contractAddress);
const contract = new web3.eth.Contract(ExchangeV1.abi, contractAddress);

const main = async () => {
  // const method = contract.methods.buyTickets(
  //   2,
  //   [1111111, 1222222, 1333333, 1444444, 1555555]
  // );

  // console.log(await contract.methods.viewLottery(2).call());
  // console.log(
  //   await contract.methods
  //     .viewUserInfoForLotteryId(walletAddress, 2, 0, 100)
  //     .call()
  // );
  // console.log(await contract.methods.viewRewardsForTicketId(2, 3, 0).call());

  // for (let i = 0; i < 5; i++) {
  //   for (let j = 0; j < 6; j++) {
  //     console.log(
  //       `${i}-${j}: ${await contract.methods
  //         .viewRewardsForTicketId(2, i, j)
  //         .call()}`
  //     );
  //   }
  // }
  // const method = contract.methods.exchenge()

  try {
    await web3.eth.call({
      from: walletAddress,
      to: contractAddress,
      data: "0x0f33c06c0000000000000000000000003b0069e97721dee0d5ce3cfbc657186e3931df2f000000000002dd1cd73a0cd618dac321ade52da576dcce9d898f7ca0798e42100000000000000000000000002857eb0310a8893f5d5649b8cb7f45698c82a6ea000000000000000000000000000000000000000000000000000000000000000d0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000003e80000000000000000000000006e40e51ce8512d390672aa5f40682f1bde24be68000000000000000000000000000000000000000000000000000000000000001cf3acfd3d3a0b49148b72d071b6ab7acf7bd955283a2477f281135225a36b80f7245516ea8d1e95f090a6ab95bef936e91add76c2eab119970aa8bf48f100f6d5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006e40e51ce8512d390672aa5f40682f1bde24be680000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001cca81f999599e4abb2f711545fbefc20f54e6dedfe72d7f507bc22981697fd3f90f4ba69641b0d6fba95f6810823d777a5cf7911da5d37fd95f12e068d9696039",
    });
  } catch (err) {
    if (err.data) {
      console.log(err.data ,'err.data')
      const result = err.data.startsWith('0x') ? err.data : `0x${err.data}`;
      const reason = web3.utils.toAscii(`0x${result.substr(138)}`);
      console.log(`Revert reason: ${reason}`);
      return;
    }
    console.log(`Revert`);
    return;
  }
  console.log('OK');
};

main();
