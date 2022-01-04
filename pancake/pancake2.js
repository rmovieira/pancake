const { JSBI, ChainId, Token, Fetcher, Route, Pair, Router, Trade, TokenAmount, TradeType } = require('@pancakeswap/sdk');
const { JsonRpcProvider } = require("@ethersproject/providers");

const BNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const CSHIP = '0x6218079f1a5d50d3a8358093699b9943a662ef7c';

const targetAccount = {
    privateKey: '<chave privada da carteira aqui>',
    address: '<endereço da carteira aqui>',
};

(async () => {
    let result
    const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')

    const tokenBNB = new Token(ChainId.TESTNET, BNB, 18);
    const tokenBUSD = new Token(ChainId.TESTNET, BUSD, 18);
    const pairData = await Fetcher.fetchPairData(tokenBNB, tokenBUSD, provider);

    const pair_bnb_busd = new Pair(pairData.tokenAmounts[0], pairData.tokenAmounts[1]);
    const rota = new Route([pair_bnb_busd], tokenBUSD);

    const trade = new Trade.exactIn(rota, new TokenAmount(tokenBUSD, JSBI.BigInt(100)), TradeType.EXACT_INPUT);


    result = Router.swapCallParameters(
        trade,
        { ttl: 50, recipient: targetAccount.address, allowedSlippage: new Percent('1', '100') }
    )

})();






