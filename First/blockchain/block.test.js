const Block =require('./block');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(()=>{
    	 data = 'bar';
    	 lastBlock = Block.genesis();
    	 block = Block.mineBlock(lastBlock, data);
    });

	it('sets the data to match the input', () => {
       expect(block.data).toEqual(data);
	});

	it('sets thr `lastHast` to match the hash of the last Block', () => {
      expect(block.lastHash).toEqual(lastBlock.hash);
	});
});