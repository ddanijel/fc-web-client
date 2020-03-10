import React, {Component} from 'react';

import FoodChain from "../../ethereum/foodChain"
import web3 from "../../ethereum/web3"

// import FoodChain from "../../ethereum/foodChain";

class FoodChainDetails extends Component {
    state = {
        fc: {
            owner: null,
            producers: []
        }
    };

    async componentDidMount(): Promise<void> {
        const result = await FoodChain("0x0Ea7D3ED8E618B90B79Aca8875da57752C78b0ef").methods.describeFoodChain().call();

        const details = {
            owner: result[0],
            producers: result[1]
        };

        this.setState({
            fc: details
        });
    }

    render() {
        return (
            <div>
                owner = {this.state.fc.owner} <br/>
                producers = {this.state.fc.producers.map((address, index) =>
                <div key={index}>{index + 1}. {address}</div>
            )}
            </div>
        );
    }
}

export default FoodChainDetails;