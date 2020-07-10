let Web3 = require('web3')
let web3 = new Web3("http://localhost:8545")

web3.eth.getCoinbase().then(function(addr) {
    console.log(addr)
    web3.eth.getBalance(addr).then(console.log)
})
