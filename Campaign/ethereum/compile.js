const path  = require('path');
const fs  = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

console.log(solc.compile(source, 1)); // 1 number of different contracts
const output = solc.compile(source, 1).contracts; // byte code of contract

fs.ensureDirSync(buildPath);
console.log(output);

for(let contract in output) {
	fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output[contract]
	);
}
