importScripts('https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js');


self.addEventListener('message', (event) => {
  const { tileset, layerData, width, height, tileWidth, tileHeight, stacked } = event.data;
  let aboveAllLayerData = null;

  const animators = [];
  const lightsToAdd = [];
  const tilesToAddToAboveAll = [];

  const tileDataLookup = {};
  tileset.forEach((t) => {
    tileDataLookup[t.tileId] = JSON.parse(t.data);
  });

  forEachTile(layerData, (tile, x, y) => {
    if (tile?.index) {
      const data = tileDataLookup[tile.index];
      if (data) {
        // Handle animators
        if (data.anim) {
          const tilesAnim = { tileId: tile.index, animData: data.anim };
          animators.push(tilesAnim);
        }
        // Handle lights
        if (data.light) {
          lightsToAdd.push([tile.centerX, tile.centerY, data.light.radius, data.light.color, data.light.intensity]);
        }
        // Handle tilesToAddToAboveAll
        if (data.depth === 'ABOVE_ALL' && !stacked) {
          if (!aboveAllLayerData) {
            aboveAllLayerData = {
              name: `${layerData.name} - ABOVE_ALL`,
              x: layerData.x,
              y: layerData.y,
              width,
              height,
              tileWidth,
              tileHeight,
              data: Array.from({ length: height }, () => new Array(width)),
            };
          }

          tilesToAddToAboveAll.push([x, y]);
        }
      }
    }
  });

  self.postMessage({ animators, lightsToAdd, tilesToAddToAboveAll, aboveAllLayerData });
});

function forEachTile(layerData, callback) {
  for (let y = 0; y < layerData.height; y++) {
    for (let x = 0; x < layerData.width; x++) {
      const tile = layerData.data[y][x];
      callback(tile, x, y);
    }
  }
}
