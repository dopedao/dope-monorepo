import { Transfer as TransferEvent } from '../generated/Loot/Loot';
import { Bag, Transfer, Wallet } from '../generated/schema';
import { Loot } from '../generated/Loot/Loot';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleTransfer(event: TransferEvent): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let tokenId = event.params.tokenId;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = new Wallet(fromId);
    fromWallet.address = fromAddress;
    fromWallet.joined = event.block.timestamp;
    fromWallet.bagsHeld = BigInt.fromI32(0);
    fromWallet.save();
  } else {
    if (!isZeroAddress(fromId)) {
      fromWallet.bagsHeld = fromWallet.bagsHeld.minus(BigInt.fromI32(1));
      fromWallet.save();
    }
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = new Wallet(toId);
    toWallet.address = toAddress;
    toWallet.joined = event.block.timestamp;
    toWallet.bagsHeld = BigInt.fromI32(1);
    toWallet.save();
  } else {
    toWallet.bagsHeld = toWallet.bagsHeld.plus(BigInt.fromI32(1));
    toWallet.save();
  }

  let bag = Bag.load(tokenId.toString());
  if (bag != null) {
    bag.currentOwner = toWallet.id;
    bag.save();
  } else {
    bag = new Bag(tokenId.toString());
    let contract = Loot.bind(event.address);
    bag.chest = contract.getChest(tokenId);
    bag.foot = contract.getFoot(tokenId);
    bag.hand = contract.getHand(tokenId);
    bag.head = contract.getHead(tokenId);
    bag.neck = contract.getNeck(tokenId);
    bag.ring = contract.getRing(tokenId);
    bag.waist = contract.getWaist(tokenId);
    bag.weapon = contract.getWeapon(tokenId);
    bag.currentOwner = toWallet.id;
    bag.minted = event.block.timestamp;
    bag.save();
  }

  let transfer = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  transfer.bag = tokenId.toString();
  transfer.from = fromWallet.id;
  transfer.to = toWallet.id;
  transfer.txHash = event.transaction.hash;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

function isZeroAddress(string: string): boolean {
  return string == '0x0000000000000000000000000000000000000000';
}
