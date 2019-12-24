pragma solidity >=0.4.21 <0.7.0;

contract DappToken {

	string public name = "DApp Token";
	string public symbol = "DAPP";
	string public standard = "DApp Token v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
    	address indexed _owner,
    	address indexed _spender,
    	uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; // map the owner, the spender and the value of allowance

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Fonction utilisée pour effectuer un transfer de token du compte appelant vers un autre compte
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // Fonction utilisée pour autoriser le _spender à dépenser un certain nombre de token du compte appelant
    function approve(address _spender, uint256 _value) public returns (bool success) {
    	allowance[msg.sender][_spender] = _value;
    	emit Approval(msg.sender, _spender, _value);
    	return true;
    }

    // Focntion pour les transferts délégués
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    	require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}