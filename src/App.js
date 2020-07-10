import React from "react";
import Web3 from "web3";

import "./App.css";
import CasinoInterface from "./contracts/Casino.json";

const ABI = CasinoInterface.abi

// REPLACE WITH YOUR OWN KEY
const INFURA_KEY = "4e3d493b08a24961be7a074185da3c21";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Change this to your contract address
    this.contractAddress = "0x80CA5DAC78558C825C0f31E28ED9Dd5ec92bF3e2"

    this.validBets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.state = {
      winningNumber: 0,
      numberOfBets: 0,
      minimumBet: 0,
      totalBet: 0,
      maxNumberOfBets: 0,
      currentBet: 0
    };
  }

  async activateWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access.
        await window.ethereum.enable();
      } catch (error) {
        console.log("Access Denied");
      }
    }

    if (typeof Web3 != "undefined") {
      console.log("Using Web3 detected from external source like Metamask");
      this.web3 = new Web3(window.ethereum);
    } else {
      console.log("No web3 detected. Falling back to HTTP provider.");
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(
          `https://ropsten.infura.io/v3/${INFURA_KEY}`
        )
      );
    }

    const contract = new this.web3.eth.Contract(
      ABI,
      this.contractAddress
    );
    this.contractInstance = contract;
  }

  async componentDidMount() {
    await this.activateWeb3();
    await this.updateState();
  }

  async updateState() {
    const minimumBet = await this.contractInstance.methods.minimumBet().call();
    this.setState({
      minimumBet: parseFloat(Web3.utils.fromWei(minimumBet, "ether"))
    });

    const totalBet = await this.contractInstance.methods.getContractBalance().call();
    this.setState({
      totalBet: parseFloat(Web3.utils.fromWei(totalBet, "ether"))
    });

    const numberOfBets = await this.contractInstance.methods
      .numberOfBets()
      .call();
    this.setState({
      numberOfBets: numberOfBets
    });

    const maxNumberOfBets = await this.contractInstance.methods
      .maxNumberOfBets()
      .call();
    this.setState({
      maxNumberOfBets: maxNumberOfBets
    });

    const winningNumber = await this.contractInstance.methods
      .winningNumber()
      .call();
    this.setState({
      winningNumber: winningNumber
    });
  }

  async voteNumber(number) {
    let bet = this.state.currentBet;

    if (parseFloat(bet) < this.state.minimumBet) {
      alert("You must bet more than the minimum");
    } else {
      const result = await this.contractInstance.methods.bet(number).send({
        gas: 3000000,
        from: window.web3.eth.accounts.currentProvider.selectedAddress,
        value: Web3.utils.toWei(bet, "ether")
      });
      console.log(result);
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>Bet for your best number and win huge amounts of Ether</h1>

        <div className="block">
          <b>Number of bets:</b> &nbsp;
          <span>{this.state.numberOfBets}</span>
        </div>

        <div className="block">
          <b>Last winning number:</b> &nbsp;
          <span>{parseInt(this.state.winningNumber) === 0 ? "No draws yet" : this.state.winningNumber}</span>
        </div>

        <div className="block">
          <b>Total ether bet:</b> &nbsp;
          <span>{this.state.totalBet} ether</span>
        </div>

        <div className="block">
          <b>Minimum bet:</b> &nbsp;
          <span>{this.state.minimumBet} ether</span>
        </div>

        <div className="block">
          <b>Max number of bets:</b> &nbsp;
          <span>{this.state.maxNumberOfBets}</span>
        </div>

        <hr />

        <h2>Vote for the next number</h2>

        <label>
          <b>
            How much Ether do you want to bet?{" "}
            <input
              className="bet-input"
              ref="ether-bet"
              type="number"
              onChange={evt => {
                this.setState({
                  currentBet: evt.target.value
                });
              }}
              placeholder={"Enter Bet"}
            />
          </b>{" "}
          ether
          <br />
        </label>

        <ul ref="numbers">
          {this.validBets.map(bet => {
            return (
              <li
                onClick={() => {
                  this.voteNumber(bet);
                }}
              >
                {bet}
              </li>
            );
          })}
        </ul>

        <hr />

        <div>
          <i>Only working with the Ropsten Test Network</i>
        </div>
        <div>
          <i>You can only vote once per account</i>
        </div>
        <div>
          <i>Your vote will be reflected when the next block is mined</i>
        </div>
      </div>
    );
  }
}

export default App;
