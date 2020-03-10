import web3 from './web3';
import FoodChain from './build/FoodChain.json';


export default address => new web3.eth.Contract(
    JSON.parse(FoodChain.interface),
    address
);