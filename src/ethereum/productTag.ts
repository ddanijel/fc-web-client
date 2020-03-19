import web3 from './web3';
import ProductTag from './build/ProductTag.json';

export default (address: string) => new web3.eth.Contract(
    JSON.parse(ProductTag.interface),
    address
);