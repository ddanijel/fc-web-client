pragma solidity ^0.6.3;

contract FoodChain {
    address public owner;
    mapping(string => bool) productTags;
    address[] public producerAddresses;

    constructor() public {
        owner = msg.sender;
    }

    function addProductTag() public {

    }

    function isHashValid(string memory hash) public view returns (bool) {
        return productTags[hash];
    }


    function registerProducer(string memory _producerName, string memory _licenceNumber, string memory _url, string memory _certificates) public {
        Producer newProducer = new Producer(address(this), msg.sender);
        producerAddresses.push(address(newProducer));
    }

}

contract Producer {
    address foodChainOwner;
    address producerAddress;
    address[] productTags;
    string producerName;
    string licenceNumber;
    string url;
    string[] certificates;
    string[] additionalActions;

    enum State {Active, Blocked}

    constructor(address _foodChainOwner, address _producerAddress) public {
        foodChainOwner = _foodChainOwner;
        producerAddress = _producerAddress;
    }

}

contract Parameters {
    enum Actions {Created, Locked, Inactive} // Enum

    struct producerParameters {
        address _address;
    }
}


contract ProductTag {
    struct location {
        string longitute;
        string latitude;
    }

    address[] public previousProductTags;

    string[] actions;
}