# How to run example 01
* npm install
* Run local ganache instance (localhost:8545)
* node 01\_example.js

# How to run example 02
* npm install
* Run local ganache instance (localhost:8545)
* Compile the following contract from http://remix.ethereum.org:
```
pragma solidity ^0.5.1;

contract SimpleStorage {
    uint private storedData;
    function set(uint x) public { storedData = x; }
    function get() view public returns (uint) {
        return storedData;
    }
}
```

* Deploy to Web3 Provider (http://localhost:8545) and get the deployed contract address.
* Update this line `const contractAddress = '0x6ce78f7700ac45c07a9bcf4619c7d39c637f5b60';` with address

# How to run example 03
* Register at https://infura.io
* Create a new project
* Change this line:
```
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a0a09fa5929c4c90b49ffc8a3b8539d2'))
```

to

```
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/<YOUR_PROJECT_ID>'))
```
