// const { ChainId, Token, WETH, Fetcher, Route } = require("@uniswap/sdk");
const { ChainId, Token, Fetcher, Percent, Route, Router, Trade, TokenAmount, JSBI, Pair, TradeType } = require('@pancakeswap/sdk');
const { JsonRpcProvider } = require("@ethersproject/providers");
var fs = require('fs')
var Tx = require('ethereumjs-tx').Transaction;
var Common = require('ethereumjs-common').default;
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3')

const { getNetwork } = require('@ethersproject/networks');
const { getDefaultProvider } = require('@ethersproject/providers');

const BNB = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
const BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";

const targetAccount = {
    privateKey: '<chave privada da carteira aqui>',
    address: '<endereço da carteira aqui>',
};

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

var pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';

(async () => {
    let result
    const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')

    const tokenA = new Token(ChainId.TESTNET, BNB, 18);
    const tokenB = new Token(ChainId.TESTNET, BUSD, 18);
    const pairData = await Fetcher.fetchPairData(tokenA, tokenB, provider);
    // console.log(pairData);

    const route = new Route([pairData], tokenA, tokenB)
    // console.log(route.midPrice.toSignificant(6));
    // console.log(route.midPrice.invert().toSignificant(6));

    // const trade = new Trade(route, new TokenAmount(ChainId.MAINNET, '1000000000000000000'), TradeType.EXACT_INPUT)
    // console.log(trade)

    const token0 = new Token(ChainId.TESTNET, '0xae13d989dac2f0debff460ac112a837c89baa7cd', 18, 'BNB')
    const token1 = new Token(ChainId.TESTNET, '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7', 18, 'BUSD')

    const pair_0_1 = new Pair(new TokenAmount(token0, JSBI.BigInt(10000)), new TokenAmount(token1, JSBI.BigInt(10000)))

    const NOT_TO_HOT = new Route([pair_0_1], token1);
    const tradeResult = new Trade.exactIn(NOT_TO_HOT, new TokenAmount(token1, "10"), TradeType.EXACT_INPUT);


    // console.log(tradeResult.executionPrice.toSignificant(6));
    // const executionPrice = tradeResult.executionPrice.toSignificant(6)

    const slippageTolerance = new Percent('5', '100')

    const amountOutMin = tradeResult.minimumAmountOut(slippageTolerance)
    console.log('amountOutMin', JSBI.toNumber(amountOutMin.raw))
    const path = [BNB, BUSD]
    const to = targetAccount.address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20
    const value = tradeResult.inputAmount.raw

    var routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));

    var web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'))
    const { address: admin } = web3.eth.accounts.wallet.add(targetAccount.privateKey)
    const pancakeSwap = new web3.eth.Contract(
        routerAbi,
        pancakeSwapRouterAddress,
        { from: targetAccount.address }
    );

    let tx = pancakeSwap.methods.swapETHForExactTokens(
        web3.utils.toHex('1'),
        path,
        to,
        deadline,
    )

    // console.log('----------------');
    tx.send({
        from: targetAccount.address,
        gasPrice: web3.utils.toHex(20000000000),
        gas: web3.utils.toHex(290000)
    });

    // console.log('----------------');

    // var privateKey = Buffer.from(targetAccount.privateKey, 'hex');

    // var transaction = new Tx(tx, { 'common': BSC_FORK });
    // transaction.sign(privateKey);



    // var txResult = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    // console.log(txResult);
    // return result;

    // const [gasPrice, gasCost] = await Promise.all([
    //     web3.eth.getGasPrice(),
    //     tx.estimateGas({ from: admin }),
    // ]);


    // console.log(`gasPrice: ${gasPrice}`)
    // console.log(`gasCost: ${gasCost}`)




    // var pancakeSwapRouterAddress = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';

    // var routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    // var contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, { from: targetAccount.address });
    // var data = contract.methods.swapExactETHForTokens(
    //     web3.utils.toHex(amountOutMin),
    //     [originToken, destinationToken],
    //     targetAccount.address,
    //     web3.utils.toHex(Math.round(Date.now() / 1000) + 60 * 20),
    // );

    // var count = await web3.eth.getTransactionCount(targetAccount.address);
    // var rawTransaction = {
    //     "from": targetAccount.address,
    //     "gasPrice": web3.utils.toHex(200090000000),
    //     "gasLimit": web3.utils.toHex(290000),
    //     "to": pancakeSwapRouterAddress,
    //     "value": web3.utils.toHex(amountToBuyWith),
    //     "data": data.encodeABI(),
    //     "nonce": web3.utils.toHex(count)
    // };

    // var transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
    // transaction.sign(privateKey);

    // var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    // console.log(result);
    // return result;
})();






