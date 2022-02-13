export default class Item {
  // item ref on sprites/manifest
  // readonly itemRef: ItemRef;
  readonly name: string;
  readonly description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
