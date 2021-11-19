import { BigInt } from "@graphprotocol/graph-ts";

import { Transfer as DopeTransferEvent } from "../generated/DopeWarsLoot/DopeWarsLoot";
import {
  Transfer as PaperTransferEvent,
  Paper,
} from "../generated/Paper/Paper";
import { Bag, Transfer, Wallet } from "../generated/schema";
import { DopeWarsLoot } from "../generated/DopeWarsLoot/DopeWarsLoot";
import { Opened } from "../generated/Initiator/Initiator";

export function handleDopeTransfer(event: DopeTransferEvent): void {
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
    fromWallet.paper = BigInt.fromI32(0);
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
    toWallet.paper = BigInt.fromI32(0);
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
    let contract = DopeWarsLoot.bind(event.address);
    bag.clothes = contract.getClothes(tokenId);
    bag.foot = contract.getFoot(tokenId);
    bag.hand = contract.getHand(tokenId);
    bag.neck = contract.getNeck(tokenId);
    bag.ring = contract.getRing(tokenId);
    bag.waist = contract.getWaist(tokenId);
    bag.weapon = contract.getWeapon(tokenId);
    bag.drugs = contract.getDrugs(tokenId);
    bag.vehicle = contract.getVehicle(tokenId);
    bag.currentOwner = toWallet.id;
    bag.minted = event.block.timestamp;
    bag.claimed = false;
    bag.opened = false;
    bag.save();
  }

  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  transfer.bag = tokenId.toString();
  transfer.from = fromWallet.id;
  transfer.to = toWallet.id;
  transfer.txHash = event.transaction.hash;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

export function handlePaperTransfer(event: PaperTransferEvent): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let value = event.params.value;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = new Wallet(fromId);
    fromWallet.address = fromAddress;
    fromWallet.joined = event.block.timestamp;
    fromWallet.bagsHeld = BigInt.fromI32(0);
    fromWallet.paper = BigInt.fromI32(0);
    fromWallet.save();
  } else {
    if (!isZeroAddress(fromId)) {
      fromWallet.paper = fromWallet.paper.minus(value);
      fromWallet.save();
    }
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = new Wallet(toId);
    toWallet.address = toAddress;
    toWallet.joined = event.block.timestamp;
    toWallet.bagsHeld = BigInt.fromI32(0);
    toWallet.paper = value;
    toWallet.save();
  } else {
    toWallet.paper = toWallet.paper.plus(value);
    toWallet.save();
  }

  if (isZeroAddress(fromId)) {
    let paper = Paper.bind(event.address);
    let loot = DopeWarsLoot.bind(paper.loot());

    let balance = loot.balanceOf(toAddress);

    for (let i = 0; i < balance.toI32(); i++) {
      let id = loot.tokenOfOwnerByIndex(toAddress, BigInt.fromI32(i));
      let bag = Bag.load(id.toString());
      if (!bag) {
        continue;
      }

      bag.claimed = paper.claimedByTokenId(id);
      bag.save();
    }
  }
}

export function handleDopeOpened(event: Opened): void {
  let id = event.params.id;
  let bag = Bag.load(id.toString());
  if (!bag) {
    return;
  }
  bag.opened = true;
  bag.save();
}

function isZeroAddress(string: string): boolean {
  return string == "0x0000000000000000000000000000000000000000";
}
