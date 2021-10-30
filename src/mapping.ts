import { Transfer as DopeTransferEvent } from "../generated/DopeWarsLoot/DopeWarsLoot";
import {
  Transfer as PaperTransferEvent,
  Paper,
} from "../generated/Paper/Paper";
import {
  Opened,
  SetRle,
  SwapMeet,
  TransferBatch,
  TransferSingle,
} from "../generated/SwapMeet/SwapMeet";

import {
  AddRles,
  Hustler as HustlerContract,
  MetadataUpdate,
  TransferBatch as HustlerTransferBatch,
  TransferSingle as HustlerTransferSingle,
} from "../generated/Hustler/Hustler";

import {
  Bag,
  Item,
  ItemBalances,
  Hustler,
  Transfer,
  Wallet,
  MaleBody,
  MaleHair,
  FemaleBody,
  FemaleHair,
  Beard,
} from "../generated/schema";
import { DopeWarsLoot } from "../generated/DopeWarsLoot/DopeWarsLoot";
import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  json,
} from "@graphprotocol/graph-ts";

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
      bag.claimed = paper.claimedByTokenId(id);
      bag.save();
    }
  }
}

function upsertItem(swapmeet: SwapMeet, id: BigInt): void {
  let item = Item.load(id.toString());
  if (!item) {
    item = new Item(id.toString());
    item.name = swapmeet.fullname(id);
    item.data = swapmeet.tokenURI(id);
  }

  item.maleRle = swapmeet.tokenRle(id, 0);
  item.femaleRle = swapmeet.tokenRle(id, 1);
  item.save();
}

export function handleSwapMeetSetRle(event: SetRle): void {
  let swapmeet = SwapMeet.bind(event.address);
  let id = event.params.id;
  upsertItem(swapmeet, id);
}

interface Trait {
  trait_type: string;
  value: string;
}

interface Metadata {
  name: string;
  image: string;
  attributes: Trait[];
}

export function handleSwapMeetTransferBatch(event: TransferBatch): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = newWallet(fromId, fromAddress, event.block.timestamp);
    fromWallet.save();
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = newWallet(toId, toAddress, event.block.timestamp);
    toWallet.save();
  }

  let swapmeet = SwapMeet.bind(event.address);
  let ids = event.params.ids;
  let values = event.params.values;

  for (let j = 0; j < ids.length; j++) {
    let id = ids[j];
    let item = Item.load(id.toString());
    if (!item) {
      item = new Item(id.toString());
      item.name = swapmeet.fullname(id);
      item.data = swapmeet.tokenURI(id);
      item.maleRle = swapmeet.tokenRle(id, 0);
      item.femaleRle = swapmeet.tokenRle(id, 1);
      item.save();
    }

    let value = values[j];
    if (!isZeroAddress(fromId)) {
      let fromBalance = ItemBalances.load(fromId + "-" + id.toString());
      fromBalance.balance = fromBalance.balance.minus(value);
      fromBalance.save();
    }

    let toBalance = ItemBalances.load(toId + "-" + id.toString());
    if (!toBalance) {
      toBalance = new ItemBalances(toId + "-" + id.toString());
      toBalance.item = id.toString();
      toBalance.wallet = toId;
      toBalance.balance = BigInt.fromI32(0);
    }

    toBalance.balance = toBalance.balance.plus(value);
    toBalance.save();
  }
}

export function handleSwapMeetTransfer(event: TransferSingle): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = newWallet(fromId, fromAddress, event.block.timestamp);
    fromWallet.save();
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = newWallet(toId, toAddress, event.block.timestamp);
    toWallet.save();
  }

  let swapmeet = SwapMeet.bind(event.address);
  let id = event.params.id;
  let item = Item.load(id.toString());
  if (!item) {
    item = new Item(id.toString());
    item.name = swapmeet.fullname(id);
    item.data = swapmeet.tokenURI(id);
  }

  item.save();

  if (!isZeroAddress(fromId)) {
    let fromBalance = ItemBalances.load(fromId + "-" + id.toString());
    fromBalance.balance = fromBalance.balance.minus(event.params.value);
    fromBalance.save();
  }

  let toBalance = ItemBalances.load(toId + "-" + id.toString());
  if (!toBalance) {
    toBalance = new ItemBalances(toId + "-" + id.toString());
    toBalance.item = id.toString();
    toBalance.wallet = toId;
    toBalance.balance = BigInt.fromI32(0);
  }

  toBalance.balance = toBalance.balance.plus(event.params.value);
  toBalance.save();
}

export function handleSwapMeetOpened(event: Opened): void {
  let ids = event.params.ids;
  for (let i = 0; i < ids.length; i++) {
    let bag = Bag.load(ids[i].toString());
    bag.opened = true;
    bag.save();
  }
}

export function handleHustlerBatchTransfer(event: HustlerTransferBatch): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = newWallet(fromId, fromAddress, event.block.timestamp);
    fromWallet.save();
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = newWallet(toId, toAddress, event.block.timestamp);
    toWallet.save();
  }

  let c = HustlerContract.bind(event.address);
  let ids = event.params.ids;

  for (let j = 0; j < ids.length; j++) {
    let id = ids[j];
    let hustler = Hustler.load(id.toString());
    if (!hustler) {
      hustler = new Hustler(id.toString());
      hustler.data = c.tokenURI(id);
    }

    hustler.owner = toId;
    hustler.save();
  }
}

export function handleHustlerTransfer(event: HustlerTransferSingle): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);

  if (!fromWallet) {
    fromWallet = newWallet(fromId, fromAddress, event.block.timestamp);
    fromWallet.save();
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = newWallet(toId, toAddress, event.block.timestamp);
    toWallet.save();
  }

  let c = HustlerContract.bind(event.address);
  let id = event.params.id;
  let hustler = Hustler.load(id.toString());
  if (!hustler) {
    hustler = new Hustler(id.toString());
    hustler.data = c.tokenURI(id);
  }
  hustler.owner = toId;
  hustler.save();
}

export function handleHustlerMetadataUpdate(event: MetadataUpdate): void {
  let id = event.params.id;
  let c = HustlerContract.bind(event.address);
  let hustler = Hustler.load(id.toString());
  if (!hustler) {
    hustler = new Hustler(id.toString());
    hustler.owner = "0x0000000000000000000000000000000000000000";
  }
  hustler.data = c.tokenURI(id);
  hustler.save();
}

export function handleHustlerAddRles(event: AddRles): void {
  let len = event.params.len;
  let part = event.params.part;
  let c = HustlerContract.bind(event.address);

  for (let i = 0; i < len.toI32(); i++) {
    let rle = c.bodyRle(part, BigInt.fromI32(i));

    if (BigInt.fromI32(part) == BigInt.fromI32(0)) {
      let mb = MaleBody.load(i.toString());
      if (!mb) {
        mb = new MaleBody(i.toString());
        mb.rle = rle;
        mb.save();
      }
    } else if (BigInt.fromI32(part) == BigInt.fromI32(1)) {
      let fb = FemaleBody.load(i.toString());
      if (!fb) {
        fb = new FemaleBody(i.toString());
        fb.rle = rle;
        fb.save();
      }
    } else if (BigInt.fromI32(part) == BigInt.fromI32(2)) {
      let mh = MaleHair.load(i.toString());
      if (!mh) {
        mh = new MaleHair(i.toString());
        mh.rle = rle;
        mh.save();
      }
    } else if (BigInt.fromI32(part) == BigInt.fromI32(3)) {
      let fh = FemaleHair.load(i.toString());
      if (!fh) {
        fh = new FemaleHair(i.toString());
        fh.rle = rle;
        fh.save();
      }
    } else if (BigInt.fromI32(part) == BigInt.fromI32(4)) {
      let b = Beard.load(i.toString());
      if (!b) {
        b = new Beard(i.toString());
        b.rle = rle;
        b.save();
      }
    }
  }
}

function newWallet(id: string, address: Bytes, timestamp: BigInt): Wallet {
  let wallet = new Wallet(id);
  wallet.address = address;
  wallet.joined = timestamp;
  wallet.bagsHeld = BigInt.fromI32(0);
  wallet.paper = BigInt.fromI32(0);
  return wallet;
}

function isZeroAddress(string: string): boolean {
  return string == "0x0000000000000000000000000000000000000000";
}
