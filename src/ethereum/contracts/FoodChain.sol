pragma solidity ^0.6.3;

contract FoodChain {
    address public owner;
    address[] public producers;

    constructor() public {
        owner = msg.sender;
    }

    function registerProducer(
        string memory _producerName,
        string memory _licenceNumber,
        string memory _url,
        string memory _certificates
    ) public {
        Producer newProducer = new Producer(
            address(this),
            msg.sender,
            _producerName,
            _licenceNumber,
            _url,
            _certificates
        );
        producers.push(address(newProducer));
    }

    function describeFoodChain() public view returns (
        address,
        address[] memory
    ) {
        return (
        owner,
        producers
        );
    }

}

contract Commons {
    string defaultActions = "Action 1; Action 2; Action 3";
}

contract Producer {
    address foodChainOwner;
    address owner;
    string producerName;
    string licenceNumber;
    string url;
    string certificates;
    string defaultActions;
    address[] productTags;

    enum State {Active, Blocked}

    constructor(
        address _foodChainOwner,
        address _owner,
        string memory _producerName,
        string memory _licenceNumber,
        string memory _url,
        string memory _certificates
    ) public {
        foodChainOwner = _foodChainOwner;
        owner = _owner;
        producerName = _producerName;
        licenceNumber = _licenceNumber;
        url = _url;
        certificates = _certificates;
    }

    function describeProducer() public view returns (
        address,
        address,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        address[] memory
    ) {
        return (
        foodChainOwner,
        owner,
        producerName,
        licenceNumber,
        url,
        certificates,
        defaultActions,
        productTags
        );
    }

}