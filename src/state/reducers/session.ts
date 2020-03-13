import {Action, ActionTypes, Session} from "../actions";
import web3 from "../../ethereum/web3";
import ProducerContract from "../../ethereum/producer";



const isAuthenticated = async () => {
    const accounts = await web3.eth.getAccounts();
    const isAuthenticated = await ProducerContract("0x5CE407D55ad82e74B98831E649FCE18639b06d76").methods.isAuthenticated().call({
        from: accounts[0]
    });
    return isAuthenticated;

};

const initialState = {
    isAuthenticated: isAuthenticated()
};

export const sessionReducer = (state: Session = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.toggleIsAuthenticated:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };
        default:
            return state
    }
};