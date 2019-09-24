const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
// const compiledCampaign = require('../ethereum/build/Campaign.json'); 

const provider = new HDWalletProvider(
  'case ship swap spoon garlic left town coral peace swear peanut spoon',
  'https://rinkeby.infura.io/v3/c9ea5f193140418aa0d329d4fd13c56f'
);

const web3 = new Web3(provider);

const deploy = async () => {
	let accounts = await web3.eth.getAccounts();
    console.log("account :"+accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
	  .deploy({ data: compiledFactory.bytecode}) 
	  .send({from: accounts[0], gas: '1000000'}); 

	console.log("contract deploed to : "+result.options.address);  
};

deploy();


// 0x9adB3C3f302a7DE2693673CAa9fF4d8Bb24fe9fa