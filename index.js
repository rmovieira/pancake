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

var originalAmountToBuyWith = '0.007' + Math.random().toString().slice(2, 7);
var bnbAmount = web3.utils.toWei(originalAmountToBuyWith, 'ether');

const targetAccount = {
    privateKey: '<chave privada da carteira aqui>',
    address: '<endereço da carteira aqui>',
};

var res = buyOnlyone(targetAccount, bnbAmount);


async function buyOnlyone(targetAccount, amount) {

    var amountToBuyWith = web3.utils.toHex(amount);
    var privateKey = Buffer.from(targetAccount.privateKey, 'hex');


    var originToken = '0xae13d989dac2f0debff460ac112a837c89baa7cd'; //WBNB
    var destinationToken = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'; //BUSD

    var amountOutMin = '10'
    var pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';

    var routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    var contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, { from: targetAccount.address });
    var data = contract.methods.swapExactETHForTokens(
        web3.utils.toHex(amountOutMin),
        [originToken, destinationToken],
        targetAccount.address,
        web3.utils.toHex(Math.round(Date.now() / 1000) + 60 * 20),
    );

    var count = await web3.eth.getTransactionCount(targetAccount.address);
    var rawTransaction = {
        "from": targetAccount.address,
        "gasPrice": web3.utils.toHex(200090000000),
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

