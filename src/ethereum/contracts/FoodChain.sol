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


    function registerProducer() public {
        Producer newProducer = new Producer(address(this), msg.sender);
        producerAddresses.push(address(newProducer));
    }

}

contract Producer {
    address public foodChainOwner;
    address public producerAddress;
    address[] public productTags;

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

    string[] actions;
}