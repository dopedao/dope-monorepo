import { Hustler, Item, WalletItems } from 'generated/graphql';

export type ProfileGear = Pick<WalletItems, "id"> & {
  item: Pick<Item, "id" | "count" | "fullname" | "name" | "svg" | "suffix" | "type">
}

export type ProfileHustler = Pick<Hustler, "id" | "name" | "svg" | "title" | "type">
