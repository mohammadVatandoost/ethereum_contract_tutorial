const Block =require('./block')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        // console.log("isValidChain");
        // console.log(chain);
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()) ) {
            console.log("dose not have valid genesis block");
            return false;
        }

        for(let i=1; i<chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash !== lastBlock.hash) {
                console.log("dose not have valid lastHash");
                return false;
            }
            if(Block.blockHash(block) !== block.hash ) { 
                console.log("dose not have valid Hash");
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        if(newChain.length <= this.chain.length) {
           console.log("received chain is not longer that current chain");
           return;
        } else if(!this.isValidChain(newChain)) {
          console.log("received chain is not valid chain");
          return;
        }
        console.log("received chain replaced");
        this.chain = newChain;
    }
}

module.exports = Blockchain;