var fs = require('fs')
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3')
var Common = require('ethereumjs-common').default;


const criarContrato = (enderecoDaCarteira) => {
    const pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
    const routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    const contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, { from: enderecoDaCarteira });
    return contract;
}


const criarTransacao = (enderecoDaCarteira, gas, gasLimite) => {
    const pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
    var count = await web3.eth.getTransactionCount(targetAccount.address);
    var rawTransaction = {
        "from": enderecoDaCarteira,
        "gasPrice": gas,
        "gasLimit": gasLimite,
        "to": pancakeSwapRouterAddress,
        "value": web3.utils.toHex(amountToBuyWith),
        "data": data.encodeABI(),
        "nonce": web3.utils.toHex(count)
    };
    return rawTransaction;
}
