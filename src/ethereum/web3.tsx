import Web3 from 'web3';
import {variableNames} from "../global/constants";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {isMnemonicValid} from "./helpers";
// https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e
// https://medium.com/@awantoch/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a



const ethEnabled = () => {
    // @ts-ignore
    if (window.ethereum) {
        // @ts-ignore
        window.web3 = new Web3(window.ethereum);
        // @ts-ignore
        window.ethereum.enable();
        return true;
    }
    return false;
};

let web3;

if (ethEnabled()) {
    // @ts-ignore
    web3 = new Web3(window.web3.currentProvider);
} else {

    let provider;

    let mnemonic = localStorage.getItem(variableNames.ethAccountMnemonic);
    if (mnemonic !== null) {
        provider = new HDWalletProvider(
            mnemonic,
            process.env.REACT_APP_INFURA_REMOTE_CLIENT_URL
        );
    } else {
        let valid = false;
        do {
            const inputMnemonic = prompt("Please enter the Seed words");
            valid = isMnemonicValid(inputMnemonic);
            if (valid) {
                // we can do this since the above method checks already that is not null
                // @ts-ignore
                provider = new HDWalletProvider(inputMnemonic,
                    process.env.REACT_APP_INFURA_REMOTE_CLIENT_URL);
                // @ts-ignore
                localStorage.setItem(variableNames.ethAccountMnemonic, inputMnemonic);
            }
        } while (!valid);
    }

    web3 = new Web3();
    web3.setProvider(provider);
}

export default web3;