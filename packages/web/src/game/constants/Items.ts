import Item from 'game/entities/player/inventory/Item';

const Items: { [key: string]: Item } = {
  apple: new Item('apple', 'A red apple'),
  banana: new Item('banana', 'A yellow banana'),
  bread: new Item('bread', 'A loaf of bread'),
  cheese: new Item('cheese', 'A slice of cheese'),
  chicken: new Item('chicken', 'A chicken'),
  coffee: new Item('coffee', 'A cup of coffee'),
  cookie: new Item('cookie', 'A cookie'),
  doughnut: new Item('doughnut', 'A doughnut'),
  egg: new Item('egg', 'An egg'),
};

export default Items;
