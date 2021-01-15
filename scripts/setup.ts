import * as ws from "ws";

export const REGION_WIDTH = 128;
export const REGION_HEIGHT = 64;

export class Block {
  index: BlockIndex;
  material: Material;
  selected: boolean;

  constructor(index: BlockIndex, material: Material) {
    this.index = index;
    this.material = material;
    this.selected = false;
  }

  select() {
    if (SelectedBlock) SelectedBlock.selected = false;
    this.selected = true;
    SelectedBlock = this;
  }
}

export var SelectedBlock: Block;

export class BlockIndex {
  x: number;
  y: number;
  region: Region;

  constructor(x: number, y: number, region: Region) {
    this.x = x;
    this.y = y;
    this.region = region;
  }
}

export class WorldIndex {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export enum Material {
  Air,
  Dirt,
  Stone,
  CopperOre,
  TinOre,
  CherryLog,
  Leaf,
  Bedrock
}

export enum Biome {
  Prairie
}

export class Region {
  id: number;
  biome: Biome;
  map: Block[][];
  constructor(id: number, biome: Biome, map: Block[][]) {
    this.id = id;
    this.biome = biome;
    this.map = map;
  }
}

export var RegionalMap: Block[][] = [[]];

export var Regions: Region[] = [new Region(0, Biome.Prairie, RegionalMap)];

export var SelectedRegion: Region = Regions[0];

export enum PrairieStructure {
  CherryTree,
  Boulder
}

export class Structure {
  index: BlockIndex;  // bottom left corner
  blocks: Block[];
}

export enum BoulderType {
  small,
  long,
  tall
}

export class Boulder extends Structure {
  type: BoulderType;
  constructor(x: number, y: number, type: BoulderType) {
    super();
    this.index = new BlockIndex(x, y, SelectedRegion);
    this.blocks = [];
    this.type = type;
    let size: number;
    if (this.type === BoulderType.small) size = 3; else size = 5;
    for (let i = 0; i < size; i++) {
      let b = new Block(new BlockIndex(this.index.x, this.index.y, SelectedRegion), Material.Stone);
      if (this.type === BoulderType.small) {
        if (i > 0) b.index.x++;
        if (i === 2) b.index.y++;
      } else if (this.type === BoulderType.long) {
        if ([1, 3].indexOf(i) > -1) b.index.x++;
        if ([2, 4].indexOf(i) > -1) b.index.x = b.index.x + 2;
        if (i > 2) b.index.y++;
      } else if (this.type === BoulderType.tall) {
        if ([1, 3].indexOf(i) > -1) b.index.x++;
        if (i === 4) b.index.y = b.index.y + 2;
        if ([2, 3].indexOf(i) > -1) b.index.y++;
      }
      if (Math.random() < 0.25) b.material = Material.CopperOre; else if (Math.random() < 0.333) b.material = Material.TinOre;
      this.blocks.push(b);
    }
  }
}

export class CherryTree extends Structure {
  constructor(x: number, y: number) {
    super();
    this.index = new BlockIndex(x, y, SelectedRegion);
    this.blocks = [];
    for (let i = 0; i < 9; i++) {  // move around in a 3x3 grid pattern, starting top left
      let b: Block;
      if (i < 6) {
        let bx = x;
        let by = y;
        if (i > 2) by++; else by += 2;
        if ([1, 2, 4, 5].indexOf(i) > -1) bx++;
        if (i === 2 || i === 5) bx++;
        b = new Block(new BlockIndex(bx, by, SelectedRegion), Material.Leaf);
      } else b = new Block(new BlockIndex(x+1, y, SelectedRegion), Material.CherryLog);
      if ([1, 2, 3, 4, 5, 7].indexOf(i) > -1) this.blocks.push(b);
    }
  }
}

export class Hero {
  x: number;
  y: number;
  region: Region;
  socket: ws.WebSocket;
  name: string;

  constructor(socket: ws.WebSocket, name: string) {
    this.region = SelectedRegion;
    this.socket = socket;
    this.name = name;
    let x = Math.floor(REGION_WIDTH/2);
    for (let y = 0; y < REGION_HEIGHT; y++) {
      if (RegionalMap[x][y].material !== Material.Dirt && RegionalMap[x][y].material !== Material.Bedrock) {
        this.x = x;
        this.y = y;
        RegionalMap[x][y].select();
        return
      }
    }
  }

  moveX(amt: number) {
    this.x += amt;
    if (this.x > REGION_WIDTH - 1.5) this.x = REGION_WIDTH - 1.5;
    if (this.x < 0) this.x = 0;
    // noinspection JSSuspiciousNameCombination
    RegionalMap[Math.floor(this.x)][Math.floor(this.y)].select();
    this.pingPos();
  }

  pingClosed(hero: Hero) {
    this.socket.send('{"type": "pingclosed", "name": "'+hero.name+'"}');
  }

  pingPos() {
    let playerpos = '{';
    for (let i = 0; i < Heroes.length; i++) {
      playerpos += '"' + Heroes[i].name + '": {"x": ' + Heroes[i].x + ', "y": ' + Heroes[i].y + ', "region": "'+Heroes[i].region.id+'"},';
    }
    playerpos = playerpos.substring(0, playerpos.length-1)+'}';
    this.socket.send('{"type": "pingpos", "players": '+playerpos+'}')
  }

  pingJoined(hero) {
    this.socket.send('{"type": "pingjoined", "name": "'+hero.name+'"}');
  }
}

export let Heroes: Hero[] = [];