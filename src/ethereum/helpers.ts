import {utils} from "ethers";
import web3 from "./web3";

export const isMnemonicValid = (mnemonic: string | null): boolean => {
    if (mnemonic == null) return false;
    return utils.HDNode.isValidMnemonic(mnemonic);
};
export const isAddressValid = (address: string | null): boolean => {
    if (address == null) return false;
    return web3.utils.isAddress(address);
};