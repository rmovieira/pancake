# pancake
Pra começar, precisa configurar a rede de test da binance, para isso adicione uma nova rede no seu gerenciador de carteira(exemplo: metamask):

url da rede: https://data-seed-prebsc-1-s1.binance.org:8545/

chaind Id: 97

url do explorador: https://testnet.bscscan.com

Após isso, é preciso depositar fundos na carteira pelo link: https://testnet.binance.org/faucet-smart


O arquivos que funciona, é o index.js. Os demais arquivos são tentativas de usar o sdk oficial da pancake, mas não tive sucesso. Ele funciona bem pra pegar o valor dos tokens, mas para executar operaçãoes não conseguir fazer funcionar.

Se quiser tentar fazer ele funciona, precisa configurar o arquivo `node_modules\@pancakeswap\sdk\dist\sdk.cjs.development.js` com as seguintes configurações
```
var FACTORY_ADDRESS = '0xb7926c0430afb07aa7defde6da862ae0bde767bc';
var INIT_CODE_HASH = '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074';
```
Essa configuração é uma das etapas para direcionar o sdk para usar a rede de teste. A outra etapa é configurar é a url do provedor.

As tentativas de uso do sdk estão no diretório `\pancake` e pancake3.js foi o que eu mais cheguei perto.


Sobre o código do arquivo index.js, pra explicar por aqui é mais complicado, o jeito é olhar o que tem lá pra tentar entender.
Em resumo, ele troca ~0.007 BNB por ~4 BUSD (claro que isso depende do preço no momento)
Ele utiliza esse clone da pancakeswap pra funcionar `https://pancake.kiemtienonline360.com/#/swap`

A principal missão aqui é "dominar" a fera, conseguir controlar os valores de entrada e saída, como é feito para interface da pancake.
Algo como: quero trocar X BNB pelo máximo que der do token Y(ou o contrário), considerando slippage sem exagerar no gas(para que a operação não demore muito para ser confirmada) etc...


Pra ter detalhes de contrato e hash da transação, é possível ver em `https://testnet.bscscan.com/`

Obs: Esses links usam apenas a rede de TESTE. A rede oficial(Mainnet) é OUTRA! São outras URLs, outros cóodigos de contratos e rotas. Não use o código do contrato da MAINNET na TESTNET pois serão diferentes e a transação vai pro limbo.
