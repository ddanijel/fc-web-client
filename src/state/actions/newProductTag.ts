import {ActionTypes} from "./types";
// import {Dispatch} from "redux";
// import web3 from "../../ethereum/web3";
// import {toggleIsLoading, ToggleIsLoadingAction} from "./ui";
// import {History} from 'history';
// import {routePaths} from "../../global/constants";
import {NewProductTagAction} from "../../interfaces/productTag";

// export interface GenerateProductTagAction {
//     type: ActionTypes.generateProductTag;
//     productTag: NewProductTag
// }
export interface AddActionToNewProductTagAction {
    type: ActionTypes.addActionToNewProductTag;
    newAction: NewProductTagAction
}

export const addActionToNewProductTag = (newAction: NewProductTagAction): AddActionToNewProductTagAction => {
    return {
        type: ActionTypes.addActionToNewProductTag,
        newAction
    }
};
//
//
// export const generateProductTag = (productTag: NewProductTag, history: History) => {
//     return async (dispatch: Dispatch) => {
//         dispatch<ToggleIsLoadingAction>(toggleIsLoading(true));
//
//         try {
//             const accounts = await web3.eth.getAccounts();
//             // const result = await FoodChain().methods.registerProducer(
//             //     producerSignUpFormData.producerName,
//             //     producerSignUpFormData.licenceNumber,
//             //     producerSignUpFormData.url,
//             //     producerSignUpFormData.certificates
//             // ).send({from: accounts[0]});
//             // const contractAddress = await FoodChain().methods.getContractForProducer(accounts[0]).call();
//             // const producerResult = await ProducerContract(contractAddress).methods.describeProducer().call();
//             // const producer = populateProducer(producerResult);
//             // saveItemToLocalStorage(variableNames.producerContractAddress, contractAddress);
//             // dispatch<ProducerSignUpAction>({
//             //     type: ActionTypes.producerSignUp,
//             //     producer
//             // });
//             history.push(routePaths.producer);
//         } catch (e) {
//             console.error(e);
//         } finally {
//             dispatch<ToggleIsLoadingAction>(toggleIsLoading(false));
//         }
//     }
// };