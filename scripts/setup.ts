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

  select(hero: Hero) {
    if (hero.selectedblock) hero.selectedblock.selected = false;
    this.selected = true;
    hero.selectedblock = this;
  }

  use(hero: Hero) {
    if (this.material === Material.CopperOre) {
      setTimeout(()=>{
        if (hero.pickup(Carryable.Copper)) this.material = Material.Stone;
      }, 1)
    }
    if (this.material === Material.Stone) {
      setTimeout(()=>{
        hero.pickup(Carryable.Stone)
      }, 1)
    }
    if (this.material === Material.TinOre) {
      setTimeout(()=>{
        if (hero.pickup(Carryable.Tin)) this.material = Material.Stone;
      }, 1)
    }
    if (this.material === Material.CherryLog) {
      setTimeout(()=>{
        hero.pickup(Carryable.CherryLog)
      }, 1)
    }
  }
}

export enum Carryable {
  Copper,
  Tin,
  Stone,
  CherryLog,
  StoneTool,
  BronzeCherryAxe,
  BronzeCherryPickAxe,
  BuzzBronzeCherryAxe,
  BuzzBronzeCherryPickAxe,
  DarkBronzeCherryAxe,
  DarkBronzeCherryPickAxe,
  Moss,
  FlytrapSeed,
  Cherry,
  CypressLog,
  CypressCone,
  RedwoodCone,
  RedwoodLog,
  Bronze,
  BuzzBronze,
  DarkBronze,
  Slime,
  Glass,
  SlimeGlass,
  Clay,
  BronzeCypressAxe,
  BronzeCypressPickAxe,
  BuzzBronzeCypressAxe,
  BuzzBronzeCypressPickaxe,
  DarkBronzeCypressAxe,
  DarkBronzeCypressPickAxe,
  BronzeRedwoodAxe,
  BronzeRedwoodPickAxe,
  BuzzBronzeRedwoodAxe,
  BuzzBronzeRedwoodPickAxe,
  DarkBronzeRedwoodAxe,
  DarkBronzeRedwoodPickaxe,
  BronzeArmor,
  BuzzBronzeArmor,
  DarkBronzeArmor,
  Necrum,
  Zipium,
  SlimyBronzeCherryAxe,
  SlimyBuzzBronzeCherryAxe,
  SlimyDarkBronzeCherryAxe,
  SlimyBronzeCypressAxe,
  SlimyBuzzBronzeCypressAxe,
  SlimyDarkBronzeCypressAxe,
  SlimyBronzeRedwoodAxe,
  SlimyBuzzBronzeRedwoodAxe,
  SlimyDarkBronzeRedwoodAxe,
  SlimyBronzeArmor,
  SlimyBuzzBronzeArmor,
  SlimyDarkBronzeArmor,
  GlassedBronzeArmor,
  GlassedBuzzBronzeArmor,
  GlassedDarkBronzeArmor,
  SlimeGlassBronzeArmor,
  SlimeGlassBuzzBronzeArmor,
  SlimeGlassDarkBronzeArmor,
  SiliconBronzeArmor,
  SiliconBuzzBronzeArmor,
  SiliconDarkBronzeArmor,
  ReinforcedBronzeArmor,
  ReinforcedBuzzBronzeArmor,
  ReinforcedDarkBronzeArmor,
  Sand,
  CherryWood,
  Redwood,
  Cypress,
  IcePlant,
  Fern
}

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
  CherryLeaves,
  Bedrock,
  Moss,
  Flytrap,
  Water,
  PiledStone,
  CherryWood,
  CypressLog,
  Cypress,
  CypressPines,
  RedwoodLog,
  Redwood,
  RedwoodPines,
  IcePlant,
  Fern,
}

export enum Biome {
  Prairie,
  PeatBog,
  Marsh,
  Mountain,
  Desert,
  River,
  Beach,
  Settlement,
  Harbor
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

export enum PeatBogStructure {}

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
        b = new Block(new BlockIndex(bx, by, SelectedRegion), Material.CherryLeaves);
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
  selectedblock: Block;
  hotbar: Carryable[] = [null, null, null, null, null, null, null, null, null, null];
  online: boolean = true;

  constructor(socket: ws.WebSocket, name: string) {
    this.region = SelectedRegion;
    this.socket = socket;
    this.name = name;
    this.hotbar[0] = Carryable.StoneTool;
    let x = Math.floor(REGION_WIDTH/2);
    for (let y = 0; y < REGION_HEIGHT; y++) {
      if (RegionalMap[x][y].material !== Material.Dirt && RegionalMap[x][y].material !== Material.Bedrock) {
        this.x = x;
        this.y = y;
        RegionalMap[x][y].select(this);
        return
      }
    }
  }

  moveX(amt: number) {
    this.x += amt;
    if (this.x > REGION_WIDTH - 0.5) this.x = REGION_WIDTH - 0.5;
    if (this.x < 1) this.x = 1;
    // noinspection JSSuspiciousNameCombination
    RegionalMap[this.x-Math.floor(this.x)<0.75? Math.floor(this.x) : Math.ceil(this.x)][this.y-Math.floor(this.y)<0.75? Math.floor(this.y) : Math.ceil(this.y)].select(this);
    this.pingPos();
  }

  pingClosed(hero: Hero) {
    this.socket.send('{"type": "pingclosed", "name": "'+hero.name+'"}');
  }

  pingPos() {
    let playerpos = '';
    for (let i = 0; i < Heroes.length; i++) {
      if (Heroes[i].online) playerpos += '"' + Heroes[i].name + '": {"x": ' + Heroes[i].x + ', "y": ' + Heroes[i].y + ', "region": "'+Heroes[i].region.id+'"},';
    }
    playerpos = playerpos.substring(0, playerpos.length-1);
    this.socket.send('{"type": "pingpos", "players": {'+playerpos+'}}')
  }

  pingJoined(hero) {
    this.socket.send('{"type": "pingjoined", "name": "'+hero.name+'"}');
  }

  pickup(carryable: Carryable): boolean {
    for (let i = 0; i < 10; i++) {
      if (this.hotbar[i] === null) {
        this.hotbar[i] = carryable;
        return true;
      }
    }
    return false;
  }

  disconnect() {
    this.online = false;
    for (let i = 0; i < Heroes.length; i++) {
      Heroes[i].pingClosed(this);
    }
  }

  reconnect() {
    this.online = true;
    for (let i = 0; i < Heroes.length; i++) {
      Heroes[i].pingJoined(this);
    }
  }
}

export let Heroes: Hero[] = [];