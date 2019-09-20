pragma solidity ^0.4.17;

contract Lottery {
   address public manager;
   address[] public players;

   function Lottery() public{
        manager = msg.sender;
   }

   function enter() public payable {
   	// for validation
   	  require(msg.value > .01 ether);
      players.push(msg.sender);
   } 

   function random() private view returns(uint) {
      return uint(keccak256(block.difficulty, now, players));
   }

   function pickWinner() public restricted { // restricted
   	 // require(msg.sender == manager); // just manage can run pick winner
   	 uint index = random() % players.length;
   	 players[index].transfer(this.balance);  // for sending money
   	 players = new address[](0); // 0 initialize size 
   }

   function returnEntries() public {
   	 require(msg.sender == manager); // just manage can run

   }

   modifier restricted() {
   	require(msg.sender == manager);
   	_; // target function code 
   }

   function getPlayers() public view returns(address[]) {
   	return players;
   }
}