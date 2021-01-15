import * as setup from "./setup";

export function generateNewRegion() {
  let biome: setup.Biome = setup.SelectedRegion.biome;
  for (let i = 0; i < setup.REGION_WIDTH; i++) {
    setup.RegionalMap.push([])
  }
  for (let i = 0; i < setup.REGION_WIDTH; i++) {
    for (let j = 0; j < setup.REGION_HEIGHT; j++) setup.RegionalMap[i].push(null);
  }
  if (biome === setup.Biome.Prairie) {
    let structures: setup.PrairieStructure[] = [];
    let boulderNum = Math.floor(Math.random() * 6);
    let cherryTreeNum = Math.floor(Math.random()*10);
    for (let i = 0; i < boulderNum; i++) structures.push(setup.PrairieStructure.Boulder);
    for (let i = 0; i < cherryTreeNum; i++) structures.push(setup.PrairieStructure.CherryTree);
    for (let y = 0; y < setup.REGION_HEIGHT; y++) {
      for (let x = 0; x < setup.REGION_WIDTH; x++) {
        let material: setup.Material;
        if (y == 0) {
          material = setup.Material.Bedrock;
        } else if (y < 3) {
          material = setup.Material.Dirt;
        } else {
          material = setup.Material.Air;
        }
        // console.log(setup.RegionalMap);
        setup.RegionalMap[x][y] = new setup.Block(new setup.BlockIndex(x, y, setup.SelectedRegion), material)
      }
    }
    for (let i = 0; i < structures.length; i++) {
      let s = structures[i];
      if (s === setup.PrairieStructure.Boulder) {
        let boulder = new setup.Boulder(Math.floor(Math.random() * (setup.REGION_WIDTH - 4)), 3, [setup.BoulderType.tall, setup.BoulderType.long, setup.BoulderType.small][Math.floor(Math.random() * 3)]);  // the x-coord of the left corner can be anywhere from zero to just under the region width
        for (let b = 0; b < boulder.blocks.length; b++) setup.RegionalMap[boulder.blocks[b].index.x][boulder.blocks[b].index.y] = boulder.blocks[b];
      } else if (s === setup.PrairieStructure.CherryTree) {
        let tree = new setup.CherryTree(Math.floor(Math.random() * (setup.REGION_WIDTH - 4)), 3);
        for (let b = 0; b < tree.blocks.length; b++) setup.RegionalMap[tree.blocks[b].index.x][tree.blocks[b].index.y] = tree.blocks[b];
      }
    }
  }
}

export function logSelectedRegion(): string {
  let out = '';
  for (let y = setup.REGION_HEIGHT - 1; y > -1; y--) {
    let line = '';
    for (let x = 0; x < setup.REGION_WIDTH; x++) {
      let m = setup.RegionalMap[x][y].material;
      line = line + (m === setup.Material.Dirt ? "D" : (m === setup.Material.Stone ? "S" : (m === setup.Material.Bedrock ? 'B' : (m === setup.Material.Air ? ' ' : (m === setup.Material.CopperOre ? 'C' : (m === setup.Material.TinOre ? 'T' : (m === setup.Material.Leaf ? 'L' : (m === setup.Material.CherryLog ? 'H' : '_'))))))))
    }
    out = out + '<br>' + line.substring(1);
  }
  return out.substring(4);
}