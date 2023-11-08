const crypto = require('node:crypto');

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          index,
          timestamp,
          data,
          previousHash,
        })
      )
      .digest('hex');
  }
}

class Blockchain {
  constructor() {
    this.blocks = [];
    this.genesisBlock = new Block(
      0,
      new Date().getTime(),
      'Genesis block',
      '0'
    );
    this.blocks.push(this.genesisBlock);
  }

  addBlock(data) {
    const newBlock = new Block(
      this.blocks.length,
      new Date().getTime(),
      data,
      this.blocks[this.blocks.length - 1].hash
    );
    this.blocks.push(newBlock);
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('Transaction 1');
blockchain.addBlock('Transaction 2');

console.log(blockchain.isValid());
console.log(blockchain.getLatestBlock());
console.log(JSON.stringify(blockchain, null, 2));
