pragma solidity ^0.5.0;

import "./usingProvable.sol";

contract Casino is usingProvable {
    // TODO: Contract fields
    address public owner;
    uint256 public minimumBet = 0.1 ether;
    uint256 public maximumBets = 10 ether;
    uint256 public numberOfBets;
    uint256 public maxNumberOfBets = 100;
    uint256 public winningNumber;

    address[] public players;
    mapping(address => uint256) public playerBets;
    mapping(uint256 => address payable[]) public bets;

    event generatedRandomNumber(string randomNumber);
    event LogNewProvableQuery(string description);

    constructor(uint256 _minimumBet, uint256 _maxNumberOfBets) public {
        // TODO: Implementation
        owner = msg.sender;

        if (_minimumBet > 0) {
            minimumBet = _minimumBet;
        }

        if (_maxNumberOfBets > 0) {
            maxNumberOfBets = _maxNumberOfBets;
        }

        provable_setProof(proofType_Ledger);
    }

    function bet(uint256 numberToBet) public payable {
        // TODO: Implementation
        require(numberOfBets < maxNumberOfBets, "Bet table is full.");
        require(
            numberToBet >= 1 && numberToBet <= 10,
            "Choose a bet number between 1 and 10."
        );
        require(
            msg.value >= minimumBet,
            "Bet is lesser than specified minimum bet."
        );
        require(
            playerBets[msg.sender] == 0,
            "You are not allowed to change your bet."
        );

        playerBets[msg.sender] = numberToBet;
        bets[numberToBet].push(msg.sender);
        players.push(msg.sender);

        numberOfBets += 1;

        if (numberOfBets >= maxNumberOfBets) {
            generateWinningNumber();
        }
    }

    function generateWinningNumber() public payable {
        // TODO: Implementation
        uint256 delay = 0;
        uint256 numberRandomBytes = 7;
        uint256 callbackGasLimit = 400000;

        provable_newRandomDSQuery(delay, numberRandomBytes, callbackGasLimit);
        emit LogNewProvableQuery(
            "Provable query was sent, standing by for the answer..."
        );
    }

    function __callback(
        bytes32 _queryID,
        string memory _result,
        bytes memory _proof
    ) public {
        // TODO: Implementation
        require(msg.sender == provable_cbAddress(), "Bad callback");
        require(
            provable_randomDS_proofVerify__returnCode(
                _queryID,
                _result,
                _proof
            ) == 0,
            "Bad Proof"
        );
        emit generatedRandomNumber(_result);

        bytes32 encodedRandom = keccak256(abi.encodePacked(_result));
        winningNumber = (uint256(encodedRandom) % 10) + 1;
        distributePrizes();
    }

    function distributePrizes() public {
        // TODO: Implementation
        if (bets[winningNumber].length != 0) {
            uint256 prize = address(this).balance / bets[winningNumber].length;

            for (
                uint256 index = 0;
                index < bets[winningNumber].length;
                index++
            ){
                address payable winner = bets[winningNumber][index];
                winner.transfer(prize);
            }
            resetBets();
        }
    }

    function resetBets() private {
        // TODO: Implementation
        for (uint256 index = 1; index <= 10; index++) {
            bets[index].length = 0;
        }
        for (uint256 index = 0; index < players.length; index++) {
            playerBets[players[index]] = 0;
        }
        numberOfBets = 0;
    }

    function getContractBalance() public view returns(uint256 balance) {
        // TODO: Implementation
        return address(this).balance;
    }
}
