const Blockchain =require('./index');
const Block =require('./block');

describe('Blockchain', () => {
    let bc, bc2;

  beforeEach(()=>{
     bc = new Blockchain();
     bc2 = new Blockchain();
  });

  it('start wiht genesis block', () => {
      expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('add a new block', () => {
      const data = "foo";
      bc.addBlock(data);
      expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('validate a valid chain', () => {
    const data = "foo";
    bc2.addBlock(data);
    // console.log("blockchain block number");
    // console.log(bc2.chain.length)
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

   it('replace chain with a valid chain', () => {
     bc2.addBlock('goo');
     bc.replaceChain(bc2.chain);
     expect(bc.chain).toEqual(bc2.chain);
   });

   it('does not replace chain with valid chain', () => {
     bc.addBlock('goo');
     bc.replaceChain(bc2.chain);
     expect(bc.chain).not.toEqual(bc2.chain);
   });

});