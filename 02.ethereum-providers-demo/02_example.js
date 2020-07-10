let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('https://api.myetherwallet.com/rop'))

web3.eth.getBalance('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8')
    .then(console.log);
