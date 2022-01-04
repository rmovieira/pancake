var fs = require('fs')
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3')
var Common = require('ethereumjs-common').default;

var web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'))
var BSC_FORK = Common.forCustomChain(
    'mainnet',
    {
        name: 'Smart Chain - Testnet',
        networkId: 97,
        chainId: 97,
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545'
    },
    'istanbul',
);

var originalAmountToBuyWith = '0.0007' + Math.random().toString().slice(2, 7);
var bnbAmount = web3.utils.toWei(originalAmountToBuyWith, 'ether');

const targetAccount = {
    privateKey: 'e2b4212e698d49988a6a9b3c605f50330202394723f595743a082e3780c0aa7e',
    address: '0xc78255fB982891825f4e203Ff8a576f8282b9f86',
};

var res = buyOnlyone(targetAccount, bnbAmount);
// console.log(res);

// web3.eth.getGasPrice()
// .then(console.log);


async function buyOnlyone(targetAccount, amount) {

    var amountToBuyWith = web3.utils.toHex(amount);
    var privateKey = Buffer.from(targetAccount.privateKey, 'hex');


    var originToken = '0xae13d989dac2f0debff460ac112a837c89baa7cd'; //WBNB
    var destinationToken = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'; //BUSD

    var amountOutMin = ''
    var pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';

    var routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    var contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, { from: targetAccount.address });
    var data = contract.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(
        web3.utils.toHex(amountOutMin),
        [originToken, destinationToken],
        targetAccount.address,
        web3.utils.toHex(Math.round(Date.now() / 1000) + 60 * 20),
    );

    var count = await web3.eth.getTransactionCount(targetAccount.address);
    var rawTransaction = {
        "from": targetAccount.address,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        "gasLimit": web3.utils.toHex(290000),
        "to": pancakeSwapRouterAddress,
        "value": web3.utils.toHex(amountToBuyWith),
        "data": data.encodeABI(),
        "nonce": web3.utils.toHex(count)
    };

    var transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
    transaction.sign(privateKey);

    var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    console.log(result);
    return result;
}
