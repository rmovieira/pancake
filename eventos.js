const ethers = require('ethers');

(async () => {


    const routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    const contractAddress = '0x6218079f1a5d50d3a8358093699b9943a662ef7c'

    const webSocketProvider = new ethers.providers.WebSocketProvider(process.env.ETHEREUM_NODE_URL, process.env.NETWORK_NAME);
    const contract = new ethers.Contract(contractAddress, abi, webSocketProvider);

    contract.on("Transfer", (from, to, value, event) => {
        console.log({
            from: from,
            to: to,
            value: value.toNumber(),
            data: event
        });
    });

})();