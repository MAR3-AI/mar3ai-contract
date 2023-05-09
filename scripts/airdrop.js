const hre = require('hardhat');
const ethers = hre.ethers;
const web3 = require('web3');
const { LedgerSigner } = require('@ethersproject/hardware-wallets');
const Eth = require('@ledgerhq/hw-app-eth').default;
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '..', 'csv', 'data.csv');

const config = require('../env.json');

const main = async () => {
  const hdPath = `m/44'/60'/0'/0/${config.ACCOUNT_INDEX}`;

  if (!(await showDeploymentInfo(hdPath))) return;

  const ledger = new LedgerSigner(ethers.provider, 'hid', hdPath);

  const HERA = (await ethers.getContractFactory('HERA')).connect(ledger);
  const Disperse = (await ethers.getContractFactory('Disperse')).connect(
    ledger
  );
  // // Testnet
  // const hera = HERA.attach('0x56794aFC044cf480a12a87f30c31BbC71A258a60');
  // const disperse = Disperse.attach(
  //   '0x94e7DEa7C5E1be6E79c344fB21Af5f40a921b540'
  // );
  // Mainnet
  const hera = HERA.attach('0x49c7295ff86eabf5bf58c6ebc858db4805738c01');
  const disperse = Disperse.attach(
    '0xD152f549545093347A162Dce210e7293f1452150'
  );

  console.log(`HERA: ${hera.address}`);
  console.log(`Disperse: ${disperse.address}`);

  const addressList = [];
  const amountList = [];
  const invalidAddresses = [];
  let totalAmount = 0;

  const data = await csv().fromFile(dataFilePath);

  data.forEach((row) => {
    addressList.push(row['Address']);
    amountList.push(web3.utils.toWei(row['Amount']));
    totalAmount += Number(row['Amount']);

    if (!web3.utils.isAddress(row['Address'])) {
      invalidAddresses.push(row['Address']);
    }
  });

  console.log(`Total amount: ${totalAmount}`);

  if (invalidAddresses.length > 0) {
    console.log('Invalid addresses:');

    for (let invalidAddress of invalidAddresses) {
      console.log(`\t${invalidAddress}`);
    }

    return;
  }

  // await hera.approve(disperse.address, web3.utils.toWei('149400'));

  await disperse.disperseToken(hera.address, addressList, amountList);
};

const showDeploymentInfo = async (hdPath) => {
  let address;

  console.log(`Please connect your Ledger and open Ethereum app...`);

  try {
    address = await getAccountAddress(hdPath);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;
  const balance = web3.utils.fromWei(
    (await ethers.provider.getBalance(address)).toString()
  );
  const txCount = await ethers.provider.getTransactionCount(address);

  console.log('Deployment Info:');
  console.log(`\tChainId: ${chainId}`);
  console.log(`\tAddress: ${address}`);
  console.log(`\tBalance: ${balance} ${config.CURRENCY_SYMBOL}`);
  console.log(`\tTxCount: ${txCount}`);

  console.log(`Please enable Blind Signing in Settings...`);

  return true;
};

const getAccountAddress = async (hdPath) => {
  return (
    await Promise.all([
      TransportNodeHid.open().then(async (transport) => {
        const eth = new Eth(transport);

        const address = (
          await Promise.all([
            eth.getAddress(hdPath).then((o) => {
              return o.address;
            }),
          ])
        )[0];

        await transport.close();

        return address;
      }),
    ])
  )[0];
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
