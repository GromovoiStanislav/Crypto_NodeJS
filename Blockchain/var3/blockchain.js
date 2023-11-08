const crypto = require('node:crypto');

const SHA256 = (message) =>
  crypto.createHash('sha256').update(message).digest('hex');

class Block {
  constructor(timestamp = '', data = '') {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
    this.previousHash = '';
  }

  getHash() {
    return SHA256(
      this.previousHash + this.timestamp + JSON.stringify(this.data)
    );
  }
}

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString(), 'Genesis Block')];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.previousHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    this.chain.push(Object.freeze(block));
  }

  isValid(blockchain = this) {
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const previousBlock = blockchain.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Block, Blockchain };
