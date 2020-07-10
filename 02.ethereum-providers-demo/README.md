# How to run example 01
* npm install
* node 01\_example.js
* For your reference, the smart contract we are interacting with is:
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

# How to run example 02
* npm install
* node 02\_example.js
