pragma solidity ^0.5.0;

contract DappToken {

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    string public name = 'DApp Token';
    string public symbol = 'DAPP';
    string public standard = 'DApp Token v1.0';
    uint public totalSupply;

    mapping(address => uint) public balanceOf;

    constructor(uint _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Transfer
    function transfer(address _to,uint _value) public returns (bool success){

        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -=  _value;
        balanceOf[_to] +=  _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}