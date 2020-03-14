import {utils} from "ethers";
import {rinkebyRemoteClientAddress, variableNames} from "../global/constants";

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

// https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e
// https://medium.com/@awantoch/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a

const isMnemonicValid = (mnemonic: string | null): boolean => {
    if (mnemonic == null) return false;
    return utils.HDNode.isValidMnemonic(mnemonic);
};

// const ethEnabled = () => {
//     if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         window.ethereum.enable();
//         return true;
//     }
//     return false;
// };


// if (ethEnabled()) {
//     web3 = new Web3(window.web3.currentProvider);
// } else {

let provider;

let mnemonic = localStorage.getItem(variableNames.ethAccountMnemonic);

if (mnemonic !== null) {
    provider = new HDWalletProvider(
        mnemonic,
        rinkebyRemoteClientAddress
    );
} else {
    let valid = false;
    do {
        const inputMnemonic = prompt("Please enter the Seed words");
        valid = isMnemonicValid(inputMnemonic);
        if (valid) {
            provider = new HDWalletProvider(
                inputMnemonic,
                rinkebyRemoteClientAddress
            );
            // we can do this since the above method checks already that is not null
            // @ts-ignore
            localStorage.setItem(variableNames.ethAccountMnemonic, inputMnemonic);
        }
    } while (!valid);
}

// alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");


const web3 = new Web3(provider);

console.log("web3 provider: ", web3);
// }

if (web3 === undefined) {
    alert('Please enable Metamask to continue');
}

export default web3;