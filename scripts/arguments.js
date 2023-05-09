// Use for verify, https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
const busd = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const revenueWallet = '0x498cCC04796F88719feF1f37cDa5B72c0cf48637';
const adminWallet = '0x23dE65a96151736a19e3D2D1735358988E8A6022';
const ticketPrice = ethers.utils.parseEther('0.01');
const baseURI = 'ipfs://';
const signer = '0x3B0069e97721DeE0d5ce3Cfbc657186E3931dF2F';
const transferProxy = '0xfFc0F3b0225621E8e0823dc0e199999F549017b6';
const transferProxyForDeprecated = '0xe118518737459e9326db55299aeA9a50AB2056Ed';
const erc20TransferProxy = '0xBBE5aB5D7c44544bf1Bc825161cAf0F5EA695870';
const exchangeStateV1 = '0x57Fe2Fc795722b4fBB77e1Acc3df724367D2e70A';
const exchangeOrdersHolderV1 = '0xD68ae53dcC2A337bD1790556863a24c4b49eA4aE';
const beneficiary = '0x6bF7588C083D5496c659fFF9aEd6Db4AcE50512D'
module.exports = [
    // baseURI,
    // signer
    transferProxy,
    transferProxyForDeprecated,
    erc20TransferProxy,
    exchangeStateV1,
    exchangeOrdersHolderV1,
    beneficiary,
    signer
];
