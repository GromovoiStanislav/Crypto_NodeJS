const { Block, Blockchain } = require('./blockchain.js');

const blockchain = new Blockchain();

blockchain.addBlock(
  new Block(Date.now().toString(), { from: 'Alex', to: 'Satoshi', amount: 500 })
);

blockchain.addBlock(
  new Block(Date.now().toString(), {
    from: 'Alexander',
    to: 'Alex',
    amount: 100,
  })
);

blockchain.addBlock(
  new Block(Date.now().toString(), {
    from: 'Andrey',
    to: 'Satoshi',
    amount: 200,
  })
);

blockchain.addBlock(
  new Block(Date.now().toString(), { from: 'Igor', to: 'Artem', amount: 300 })
);

console.log('Is blockchain valid?', blockchain.isValid());
console.log(blockchain.chain);
