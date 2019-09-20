const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'case ship swap spoon garlic left town coral peace swear peanut spoon',
  'https://rinkeby.infura.io/v3/79b9731ec1534cd49241c59398cfdbcf'
);

const INITIAL_MESSAGE = 'Hello world';

const web3 = new Web3(provider);

const deploy = async () => {
	let accounts = await web3.eth.getAccounts();
    console.log("account :"+accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
	  .deploy({ data: bytecode}) 
	  .send({from: accounts[0], gas: '1000000'}); 

    console.log("interface"); console.log(interface);  
	console.log("contract deploed to : "+result.options.address);  
};

deploy();
