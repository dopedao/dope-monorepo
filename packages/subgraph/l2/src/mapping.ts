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
import {
	Address,
	BigInt,
	ByteArray,
	Bytes,
	json,
} from "@graphprotocol/graph-ts";

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
		fromWallet = newWallet(fromId, fromAddress);
		fromWallet.save();
	}

	let toId = toAddress.toHex();
	let toWallet = Wallet.load(toId);
	if (!toWallet) {
		toWallet = newWallet(toId, toAddress);
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
			if (!fromBalance) {
				fromBalance = newItemBalance(id.toString(), fromId);
			}

			fromBalance.balance = fromBalance.balance.minus(value);
			fromBalance.save();
		}

		let toBalance = ItemBalances.load(toId + "-" + id.toString());
		if (!toBalance) {
			toBalance = newItemBalance(id.toString(), toId);
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
		fromWallet = newWallet(fromId, fromAddress);
		fromWallet.save();
	}

	let toId = toAddress.toHex();
	let toWallet = Wallet.load(toId);
	if (!toWallet) {
		toWallet = newWallet(toId, toAddress);
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
		if (!fromBalance) {
			fromBalance = newItemBalance(id.toString(), fromId);
		}

		fromBalance.balance = fromBalance.balance.minus(event.params.value);
		fromBalance.save();
	}

	let toBalance = ItemBalances.load(toId + "-" + id.toString());
	if (!toBalance) {
		toBalance = newItemBalance(id.toString(), toId);
	}

	toBalance.balance = toBalance.balance.plus(event.params.value);
	toBalance.save();
}

export function handleHustlerBatchTransfer(event: HustlerTransferBatch): void {
	let fromAddress = event.params.from;
	let toAddress = event.params.to;
	let fromId = fromAddress.toHex();
	let fromWallet = Wallet.load(fromId);

	if (!fromWallet) {
		fromWallet = newWallet(fromId, fromAddress);
		fromWallet.save();
	}

	let toId = toAddress.toHex();
	let toWallet = Wallet.load(toId);
	if (!toWallet) {
		toWallet = newWallet(toId, toAddress);
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
		fromWallet = newWallet(fromId, fromAddress);
		fromWallet.save();
	}

	let toId = toAddress.toHex();
	let toWallet = Wallet.load(toId);
	if (!toWallet) {
		toWallet = newWallet(toId, toAddress);
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

function newWallet(id: string, address: Bytes): Wallet {
	let wallet = new Wallet(id);
	wallet.address = address;
	return wallet;
}

function newItemBalance(itemId: string, walletId: string): ItemBalances {
	const balance = new ItemBalances(walletId + "-" + itemId);
	balance.item = itemId;
	balance.wallet = walletId;
	balance.balance = BigInt.fromI32(0);
	return balance;
}

function isZeroAddress(string: string): boolean {
	return string == "0x0000000000000000000000000000000000000000";
}
