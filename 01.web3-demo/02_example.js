let Web3 = require('web3')
let web3 = new Web3("http://localhost:8545")

const contractAddress = '0x6ce78f7700ac45c07a9bcf4619c7d39c637f5b60';
const contractABI = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
let contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.get()
    .call({from: '0xa24c8e169c36f179308a7baa5a499fce09a0b877'})
    .then(console.log)
