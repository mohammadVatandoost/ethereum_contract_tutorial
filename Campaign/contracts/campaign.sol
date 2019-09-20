pragma solidity ^0.4.17;

contract Campaign {
   struct Request {
     string description;
     uint value;
     address recipient;
     bool complete;
   }  
   // int[] storage myArray = numbers // myArray is pointer
   // int[] memory myArray = numbers // myArray is new variable

   address public manager;
   uint public minimunContribution;
   address[] approvers;
   Request[] requests;

   modifier restricted() {
      require(msg.sender == manager);
      _; // target function code 
   } 

   function Campaign(uint minimun) public{
        manager = msg.sender;
        minimunContribution = minimun;
   }

   function contribute() public payable {
   	// for validation
   	require(msg.value >= minimunContribution);
      approvers.push(msg.sender);
   } 

   function createRequest(string description, uint value, address recipient) public restricted { // restricted
   	Request newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,
         complete: false
      }); 

      requests.push(newRequest); 
   }

}