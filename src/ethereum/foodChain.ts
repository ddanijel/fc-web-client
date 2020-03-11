import web3 from './web3';
import FoodChain from './build/FoodChain.json';
import {foodChainFactoryAddress} from "../global/constants";

export default () => new web3.eth.Contract(
    JSON.parse(FoodChain.interface),
    foodChainFactoryAddress
);