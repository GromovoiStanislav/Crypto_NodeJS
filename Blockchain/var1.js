const crypto = require('crypto');

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data)
      )
      .digest('hex');
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '0', new Date().getTime(), 'Genesis Block');
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const myBlockchain = new Blockchain();

myBlockchain.addBlock(
  new Block(1, myBlockchain.getLastBlock().hash, new Date().getTime(), {
    amount: 4,
  })
);

myBlockchain.addBlock(
  new Block(2, myBlockchain.getLastBlock().hash, new Date().getTime(), {
    amount: 8,
  })
);

myBlockchain.addBlock(
  new Block(3, myBlockchain.getLastBlock().hash, new Date().getTime(), {
    amount: 9,
  })
);

console.log('Is blockchain valid? ' + myBlockchain.isChainValid());
console.log(myBlockchain.getLastBlock());
console.log(JSON.stringify(myBlockchain, null, 2));
