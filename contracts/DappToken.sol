pragma solidity ^0.5.0;

contract DappToken {

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    // approve
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    string public name = 'DApp Token';
    string public symbol = 'DAPP';
    string public standard = 'DApp Token v1.0';
    uint public totalSupply;

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    constructor(uint _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // allowance

    // Transfer
    function transfer(address _to,uint _value) public returns (bool success){

        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -=  _value;
        balanceOf[_to] +=  _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // approve
    function approve(address _spender, uint _value) public returns (bool success){
        // allowance
        allowance[msg.sender][_spender] = _value;
        // Approve event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // TranferFrom
}