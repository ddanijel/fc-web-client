import web3 from './web3';
import Producer from './build/Producer.json';

export default (address: string) => new web3.eth.Contract(
    JSON.parse(Producer.interface),
    address
);