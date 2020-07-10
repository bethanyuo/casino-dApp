let Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a0a09fa5929c4c90b49ffc8a3b8539d2'))
web3.eth.getBalance('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8')
    .then(console.log);
