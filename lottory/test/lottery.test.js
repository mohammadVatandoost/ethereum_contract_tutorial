const assert = require('assert');
const ganache = require('ganache-cli'); // test network
const Web3 = require('web3'); 
const { interface, bytecode } = require('../compile');
// const web3 = new Web3(ganache.provider());

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let lottery;

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
	lottery = await new web3.eth.Contract(JSON.parse(interface))
	  .deploy({ data: bytecode})
	  .send({from: accounts[0], gas: '1000000'});
});

describe('Lottery', () => {
   it('deploy a contract', () => {
   	assert.ok(lottery.options.address); // check contract deployed correctly // ok check not to be null
   });

   it('lottery enter one account', async () =>{
      await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0.02', 'ether')});
      let players = await lottery.methods.getPlayers().call({from: accounts[0]});
      assert.equal(accounts[0], players[0] );
      assert.equal(1, players.length);
   });

   it('allowss multiple accounts to enter', async () =>{
      await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0.02', 'ether')});
      await lottery.methods.enter().send({from: accounts[1], value: web3.utils.toWei('0.02', 'ether')});
      await lottery.methods.enter().send({from: accounts[2], value: web3.utils.toWei('0.02', 'ether')});
      let players = await lottery.methods.getPlayers().call({from: accounts[0]});
      assert.equal(accounts[0], players[0] );
      assert.equal(accounts[1], players[1] );
      assert.equal(accounts[2], players[2] );
      assert.equal(3, players.length);
   });

   it('it requires minumum amount', async () =>{
      try {
         await lottery.methods.enter().send({
            from: accounts[0], value: web3.utils.toWei('0.001', 'ether')});
         assert(false);
      } catch(err) {
        assert(err); // check for boolean value but assert ok check for existance
      }
   });

   it('it chaeck manager', async () =>{
      try {
         await lottery.methods.pickWinner().call({from: accounts[1]});
         assert(false);
      } catch(err) {
        assert(err); // check for boolean value but assert ok check for existance
      }
   });

   it('it pickWinner balance check', async () =>{
      await lottery.methods.enter().send({
            from: accounts[0], value: web3.utils.toWei('2', 'ether')});

      const initialBalance = await web3.eth.getBalance(accounts[0]);
      console.log("initialBalance :", initialBalance);
      await lottery.methods.pickWinner().send({from: accounts[0]});
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log("balance :", balance);
      const difference = balance - initialBalance;
      console.log("gas value :", difference);
      assert(difference > web3.utils.toWei('1.8', 'ether') )
   });

});
