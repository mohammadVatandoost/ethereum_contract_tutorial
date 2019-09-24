pragma solidity ^0.4.17;

contract CampaignFactory {
  address[] public deployedCampaign;

  function createCampaign(uint minimun) public {
     address newCampaign = new Campaign(minimun, msg.sender);
     deployedCampaign.push(newCampaign);
  }

  function getDeployedCampaign() public view returns (address[]) {
    return deployedCampaign;
  }
}

contract Campaign {
   struct Request {
     string description;
     uint value;
     address recipient;
     bool complete;
     uint approvalCount;
     mapping(address => bool) approvals;
   }  
   // int[] storage myArray = numbers // myArray is pointer
   // int[] memory myArray = numbers // myArray is new variable

   address public manager;
   uint public minimunContribution;
   // address[] approvers;
   mapping(address => bool) public approvers;
   Request[] public requests;
   uint public approversCount;

   modifier restricted() {
      require(msg.sender == manager);
      _; // target function code 
   } 

   function Campaign(uint minimun, address creator) public {
        // manager = msg.sender;
        manager = creator ;
        minimunContribution = minimun ;
   }

   function contribute() public payable {
   	// for validation
   	require(msg.value >= minimunContribution);
      // approvers.push(msg.sender);
      approvers[msg.sender] = true ;
      approversCount++;
   } 

   function createRequest(string description, uint value, address recipient) public restricted { // restricted
      // require(approvers[msg.sender]);
      // global variable just be storage
      // just inintialize value type // do not initilize mapping
   	Request memory newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,
         complete: false,
         approvalCount: 0         
      }); 

      requests.push(newRequest); 
   }

   function approveRequest(uint index) public {
     // Request storage request = requests[index];
     require(approvers[msg.sender]);
     require(!requests[index].approvals[msg.sender]);
     requests[index].approvals[msg.sender] = true;
     requests[index].approvalCount++;
   }

   function finalizeRequest(uint index) public restricted { 
      // Request storage request = requests[index];
      require(!requests[index].complete);
      require(requests[index].approvalCount > (approversCount/2) );
      requests[index].recipient.transfer(requests[index].value);
      requests[index].complete = true;
   }

}