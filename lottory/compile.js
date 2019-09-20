const path  = require('path');
const fs  = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

// console.log(solc.compile(source, 1)); // 1 number of different contracts
module.exports = solc.compile(source, 1).contracts[':Lottery']; // byte code of contract