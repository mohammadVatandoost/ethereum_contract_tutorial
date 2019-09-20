const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'case ship swap spoon garlic left town coral peace swear peanut spoon',
  'https://rinkeby.infura.io/v3/a9a1672fe038497b973688e1ef8c068f'
);

const INITIAL_MESSAGE = 'Hello world';

const web3 = new Web3(provider);

const deploy = async () => {
	let accounts = await web3.eth.getAccounts();
    console.log("account :"+accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
	  .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] }) 
	  .send({from: accounts[0], gas: '1000000'}); 

	console.log("contract deploed to : "+result.options.address);  
};

deploy();
