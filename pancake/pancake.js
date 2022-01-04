const { ChainId, Token, WETH, Fetcher, Route } = require("@uniswap/sdk");
const Pancake = require('@pancakeswap-libs/sdk');
const { JsonRpcProvider } = require("@ethersproject/providers");
// var Web3 = require('web3')

const { getNetwork } = require('@ethersproject/networks');
const { getDefaultProvider } = require('@ethersproject/providers');

const CSHIP = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
// const provider = new JsonRpcProvider('https://bsc-dataseed1.ninicoin.io'); //pancake
// const provider = new JsonRpcProvider('https://bsc-dataseed.binance.org/');


(async () => {
    let result
    // provider = getDefaultProvider(getNetwork(Pancake.ChainId.MAINNET)),
    // result = await Pancake.Fetcher.fetchTokenData(Pancake.ChainId.MAINNET, BUSD, provider);
    // console.log(result);



    const tokenA = new Pancake.Token(Pancake.ChainId.MAINNET, CSHIP, 18);
    const tokenB = new Pancake.Token(Pancake.ChainId.MAINNET, BUSD, 18);
    result = await Pancake.Fetcher.fetchPairData(tokenB, tokenA, provider);
    console.log(result);


    // const DAI = new Token(ChainId.MAINNET, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18);
    // // note that you may want/need to handle this async code differently,// for example if top-level await is not an optionconst pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
    // const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
    // const route = new Route([pair], WETH[DAI.chainId]);

    // console.log(route)


    // console.log(route.midPrice.toSignificant(6)); // 201.306
    // console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756


})();






