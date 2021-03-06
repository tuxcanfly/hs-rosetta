/*!
 * block.js - block object for rosetta.
 * Copyright (c) 2020, The Handshake Developers.
 * https://github.com/handshake-org/hs-rosetta
 */

'use strict';

const TX = require('./tx');

class Block {
  constructor(height, block, view, prev, network) {
    this.height = height;
    this.block = block;
    this.view = view;
    this.prev = prev;
    this.network = network;
  }

  transactions() {
    const transactions = [];
    for (const transaction of this.block.txs) {
      const tx = new TX(transaction, this.view, this.network);
      transactions.push(tx);
    }
    return transactions;
  }

  toJSON() {
    return {
      block: {
        block_identifier: {
          index: this.height,
          hash: this.block.hashHex()
        },
        parent_block_identifier: this.prev,
        timestamp: this.block.time * 1000,
        transactions: this.transactions(),
        metadata: {
          transactions_root: this.block.merkleRoot.toString('hex'),
          difficulty: toDifficulty(this.block.bits)
        }
      }
    };
  }
}

function toDifficulty(bits) {
  let shift = (bits >>> 24) & 0xff;
  let diff = 0x0000ffff / (bits & 0x00ffffff);

  while (shift < 29) {
    diff *= 256.0;
    shift++;
  }

  while (shift > 29) {
    diff /= 256.0;
    shift--;
  }

  return diff;
}

module.exports = Block;
