const assert = require('assert');
const ganache = require('ganache-cli'); // test network
const Web3 = require('web3'); 


const { interface, bytecode } = require('../compile');
// const web3 = new Web3(ganache.provider());

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hello world';

beforeEach(async ()=>{
	// Get a list of all accounts
	// web3.eth.getAccounts()
	//  .then((fetchedAccounts) => {
	//  	console.log(fetchedAccounts);
	//  	accounts = fetchedAccounts ;
	//  });
    accounts = await web3.eth.getAccounts();
	// Use one of those to deploy
	//the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
	  .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
	  .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
   it('deploy a contract', () => {
   	assert.ok(inbox.options.address); // check contract deployed correctly // ok check not to be null
   	
   	 // console.log(inbox);
   });

   it('it has difault message', async () =>{
      const message = await inbox.methods.message().call();
      assert.equal(message, INITIAL_MESSAGE);
   });

   it('can change message', async () =>{
      await inbox.methods.setMessage("goodBye").send({from: accounts[0]});
      const message = await inbox.methods.message().call();
      assert.equal(message, "goodBye");
   });
});
