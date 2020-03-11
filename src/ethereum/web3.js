import Web3 from 'web3';

// https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e
// https://medium.com/@awantoch/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a

const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
};

let web3;

if (ethEnabled()) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
    // const HDWalletProvider = require('truffle-hdwallet-provider');
    //
    // const provider = new HDWalletProvider(
    //     process.env.REACT_APP_ETH_ACCOUNT_SEED_WORDS,
    //     process.env.REACT_APP_ETH_REMOTE_NODE_URL
    // );
    //
    // web3 = new Web3(provider);
    //
    // console.log("HDWalletProvider provider: ", web3);
}

if (web3 === undefined) {
    alert('Please enable Metamask to continue');
}

export default web3;