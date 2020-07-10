let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a0a09fa5929c4c90b49ffc8a3b8539d2'))

const contractAddress = '0x3a238b47b118480f107034e4cdef0a8b24b76860';
const contractABI = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
let contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.get()
    .call()
    .then(console.log)
