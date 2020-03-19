pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract FoodChain {
    address public owner;
    address[] public producers;
    mapping(address => address) producerAddresses;

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
        producerAddresses[msg.sender] = address(newProducer);
        emit ContractCreated(address(newProducer));
    }

    event ContractCreated(address newAddress);

    function describeFoodChain() public view returns (
        address,
        address[] memory
    ) {
        return (
        owner,
        producers
        );
    }

    function getContractForProducer(address producerAccountAddress) public view returns (
        address
    ) {
        return (
        producerAddresses[producerAccountAddress]
        );
    }

}

contract Producer {
    address foodChainContractAddress;
    address producerOwnerAccountAddress;
    string producerName;
    string licenceNumber;
    string url;
    string certificates;
    string defaultActions;
    address[] productTags;


    enum State {Active, Blocked}

    constructor(
        address _foodChainContractAddress,
        address _producerOwnerAccountAddress,
        string memory _producerName,
        string memory _licenceNumber,
        string memory _url,
        string memory _certificates
    ) public {
        foodChainContractAddress = _foodChainContractAddress;
        producerOwnerAccountAddress = _producerOwnerAccountAddress;
        producerName = _producerName;
        licenceNumber = _licenceNumber;
        url = _url;
        certificates = _certificates;
    }

    function generateProductTag(
        string[] memory _actions,
        string memory _longitude,
        string memory _latitude,
        address[] memory _previousProductTags
    ) public returns(address) {
        require(msg.sender == producerOwnerAccountAddress);

        ProductTag pt = new ProductTag(
            address(this),
            _actions,
            _longitude,
            _latitude,
            _previousProductTags
        );

        productTags.push(address(pt));
        return address(pt);
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
        foodChainContractAddress,
        producerOwnerAccountAddress,
        producerName,
        licenceNumber,
        url,
        certificates,
        defaultActions,
        productTags
        );
    }

    function isAuthenticated() public view returns (bool) {
        return (producerOwnerAccountAddress == msg.sender);
    }
}

contract ProductTag {
    address producerContractAddress;
    string[] actions;
    string longitude;
    string latitude;
    address[] previousProductTags;

    constructor(
        address _producerContractAddress,
        string[] memory _actions,
        string memory _longitude,
        string memory _latitude,
        address[] memory _previousProductTags
    ) public {
        producerContractAddress = _producerContractAddress;
        actions = _actions;
        longitude = _longitude;
        latitude = _latitude;
        previousProductTags = _previousProductTags;
    }

    function describeProductTag() public view returns (
        address,
        string[],
        string,
        string,
        address[]
    ) {
        return (
        producerContractAddress,
        actions,
        longitude,
        latitude,
        previousProductTags
        );
    }

}


