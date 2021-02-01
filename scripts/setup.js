"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGION_WIDTH = 128;
exports.REGION_HEIGHT = 64;
var Block = /** @class */ (function () {
    function Block(index, material) {
        this.index = index;
        this.material = material;
        this.selected = false;
    }
    Block.prototype.select = function (hero) {
        if (hero.selectedblock)
            hero.selectedblock.selected = false;
        this.selected = true;
        hero.selectedblock = this;
    };
    Block.prototype.use = function (hero) {
        var _this = this;
        if (this.material === Material.CopperOre) {
            setTimeout(function () {
                if (hero.pickup(Carryable.Copper))
                    _this.material = Material.Stone;
            }, 1);
        }
        if (this.material === Material.Stone) {
            setTimeout(function () {
                hero.pickup(Carryable.Stone);
            }, 1);
        }
        if (this.material === Material.TinOre) {
            setTimeout(function () {
                if (hero.pickup(Carryable.Tin))
                    _this.material = Material.Stone;
            }, 1);
        }
        if (this.material === Material.CherryLog) {
            setTimeout(function () {
                hero.pickup(Carryable.CherryLog);
            }, 1);
        }
    };
    return Block;
}());
exports.Block = Block;
var Carryable;
(function (Carryable) {
    Carryable[Carryable["Copper"] = 0] = "Copper";
    Carryable[Carryable["Tin"] = 1] = "Tin";
    Carryable[Carryable["Stone"] = 2] = "Stone";
    Carryable[Carryable["CherryLog"] = 3] = "CherryLog";
    Carryable[Carryable["StoneTool"] = 4] = "StoneTool";
    Carryable[Carryable["BronzeCherryAxe"] = 5] = "BronzeCherryAxe";
    Carryable[Carryable["BronzeCherryPickAxe"] = 6] = "BronzeCherryPickAxe";
    Carryable[Carryable["BuzzBronzeCherryAxe"] = 7] = "BuzzBronzeCherryAxe";
    Carryable[Carryable["BuzzBronzeCherryPickAxe"] = 8] = "BuzzBronzeCherryPickAxe";
    Carryable[Carryable["DarkBronzeCherryAxe"] = 9] = "DarkBronzeCherryAxe";
    Carryable[Carryable["DarkBronzeCherryPickAxe"] = 10] = "DarkBronzeCherryPickAxe";
    Carryable[Carryable["Moss"] = 11] = "Moss";
    Carryable[Carryable["FlytrapSeed"] = 12] = "FlytrapSeed";
    Carryable[Carryable["Cherry"] = 13] = "Cherry";
    Carryable[Carryable["CypressLog"] = 14] = "CypressLog";
    Carryable[Carryable["CypressCone"] = 15] = "CypressCone";
    Carryable[Carryable["RedwoodCone"] = 16] = "RedwoodCone";
    Carryable[Carryable["RedwoodLog"] = 17] = "RedwoodLog";
    Carryable[Carryable["Bronze"] = 18] = "Bronze";
    Carryable[Carryable["BuzzBronze"] = 19] = "BuzzBronze";
    Carryable[Carryable["DarkBronze"] = 20] = "DarkBronze";
    Carryable[Carryable["Slime"] = 21] = "Slime";
    Carryable[Carryable["Glass"] = 22] = "Glass";
    Carryable[Carryable["SlimeGlass"] = 23] = "SlimeGlass";
    Carryable[Carryable["Clay"] = 24] = "Clay";
    Carryable[Carryable["BronzeCypressAxe"] = 25] = "BronzeCypressAxe";
    Carryable[Carryable["BronzeCypressPickAxe"] = 26] = "BronzeCypressPickAxe";
    Carryable[Carryable["BuzzBronzeCypressAxe"] = 27] = "BuzzBronzeCypressAxe";
    Carryable[Carryable["BuzzBronzeCypressPickaxe"] = 28] = "BuzzBronzeCypressPickaxe";
    Carryable[Carryable["DarkBronzeCypressAxe"] = 29] = "DarkBronzeCypressAxe";
    Carryable[Carryable["DarkBronzeCypressPickAxe"] = 30] = "DarkBronzeCypressPickAxe";
    Carryable[Carryable["BronzeRedwoodAxe"] = 31] = "BronzeRedwoodAxe";
    Carryable[Carryable["BronzeRedwoodPickAxe"] = 32] = "BronzeRedwoodPickAxe";
    Carryable[Carryable["BuzzBronzeRedwoodAxe"] = 33] = "BuzzBronzeRedwoodAxe";
    Carryable[Carryable["BuzzBronzeRedwoodPickAxe"] = 34] = "BuzzBronzeRedwoodPickAxe";
    Carryable[Carryable["DarkBronzeRedwoodAxe"] = 35] = "DarkBronzeRedwoodAxe";
    Carryable[Carryable["DarkBronzeRedwoodPickaxe"] = 36] = "DarkBronzeRedwoodPickaxe";
    Carryable[Carryable["BronzeArmor"] = 37] = "BronzeArmor";
    Carryable[Carryable["BuzzBronzeArmor"] = 38] = "BuzzBronzeArmor";
    Carryable[Carryable["DarkBronzeArmor"] = 39] = "DarkBronzeArmor";
    Carryable[Carryable["Necrum"] = 40] = "Necrum";
    Carryable[Carryable["Zipium"] = 41] = "Zipium";
    Carryable[Carryable["SlimyBronzeCherryAxe"] = 42] = "SlimyBronzeCherryAxe";
    Carryable[Carryable["SlimyBuzzBronzeCherryAxe"] = 43] = "SlimyBuzzBronzeCherryAxe";
    Carryable[Carryable["SlimyDarkBronzeCherryAxe"] = 44] = "SlimyDarkBronzeCherryAxe";
    Carryable[Carryable["SlimyBronzeCypressAxe"] = 45] = "SlimyBronzeCypressAxe";
    Carryable[Carryable["SlimyBuzzBronzeCypressAxe"] = 46] = "SlimyBuzzBronzeCypressAxe";
    Carryable[Carryable["SlimyDarkBronzeCypressAxe"] = 47] = "SlimyDarkBronzeCypressAxe";
    Carryable[Carryable["SlimyBronzeRedwoodAxe"] = 48] = "SlimyBronzeRedwoodAxe";
    Carryable[Carryable["SlimyBuzzBronzeRedwoodAxe"] = 49] = "SlimyBuzzBronzeRedwoodAxe";
    Carryable[Carryable["SlimyDarkBronzeRedwoodAxe"] = 50] = "SlimyDarkBronzeRedwoodAxe";
    Carryable[Carryable["SlimyBronzeArmor"] = 51] = "SlimyBronzeArmor";
    Carryable[Carryable["SlimyBuzzBronzeArmor"] = 52] = "SlimyBuzzBronzeArmor";
    Carryable[Carryable["SlimyDarkBronzeArmor"] = 53] = "SlimyDarkBronzeArmor";
    Carryable[Carryable["GlassedBronzeArmor"] = 54] = "GlassedBronzeArmor";
    Carryable[Carryable["GlassedBuzzBronzeArmor"] = 55] = "GlassedBuzzBronzeArmor";
    Carryable[Carryable["GlassedDarkBronzeArmor"] = 56] = "GlassedDarkBronzeArmor";
    Carryable[Carryable["SlimeGlassBronzeArmor"] = 57] = "SlimeGlassBronzeArmor";
    Carryable[Carryable["SlimeGlassBuzzBronzeArmor"] = 58] = "SlimeGlassBuzzBronzeArmor";
    Carryable[Carryable["SlimeGlassDarkBronzeArmor"] = 59] = "SlimeGlassDarkBronzeArmor";
    Carryable[Carryable["SiliconBronzeArmor"] = 60] = "SiliconBronzeArmor";
    Carryable[Carryable["SiliconBuzzBronzeArmor"] = 61] = "SiliconBuzzBronzeArmor";
    Carryable[Carryable["SiliconDarkBronzeArmor"] = 62] = "SiliconDarkBronzeArmor";
    Carryable[Carryable["ReinforcedBronzeArmor"] = 63] = "ReinforcedBronzeArmor";
    Carryable[Carryable["ReinforcedBuzzBronzeArmor"] = 64] = "ReinforcedBuzzBronzeArmor";
    Carryable[Carryable["ReinforcedDarkBronzeArmor"] = 65] = "ReinforcedDarkBronzeArmor";
    Carryable[Carryable["Sand"] = 66] = "Sand";
    Carryable[Carryable["CherryWood"] = 67] = "CherryWood";
    Carryable[Carryable["Redwood"] = 68] = "Redwood";
    Carryable[Carryable["Cypress"] = 69] = "Cypress";
    Carryable[Carryable["IcePlant"] = 70] = "IcePlant";
    Carryable[Carryable["Fern"] = 71] = "Fern";
    Carryable[Carryable["Rye"] = 72] = "Rye";
    Carryable[Carryable["Bread"] = 73] = "Bread";
    Carryable[Carryable["Venison"] = 74] = "Venison";
    Carryable[Carryable["Antler"] = 75] = "Antler";
    Carryable[Carryable["Bone"] = 76] = "Bone";
    Carryable[Carryable["DeerPelt"] = 77] = "DeerPelt";
    Carryable[Carryable["RedPaintedCherryWood"] = 78] = "RedPaintedCherryWood";
    Carryable[Carryable["WhitePaintedCherryWood"] = 79] = "WhitePaintedCherryWood";
    Carryable[Carryable["BlackPaintedCherryWood"] = 80] = "BlackPaintedCherryWood";
    Carryable[Carryable["RedPaintedRedwood"] = 81] = "RedPaintedRedwood";
    Carryable[Carryable["WhitePaintedRedwood"] = 82] = "WhitePaintedRedwood";
    Carryable[Carryable["BlackPaintedRedWood"] = 83] = "BlackPaintedRedWood";
    Carryable[Carryable["RedPaintedCypress"] = 84] = "RedPaintedCypress";
    Carryable[Carryable["WhitePaintedCypress"] = 85] = "WhitePaintedCypress";
    Carryable[Carryable["BlackPaintedCypress"] = 86] = "BlackPaintedCypress";
    Carryable[Carryable["Abalone"] = 87] = "Abalone";
    Carryable[Carryable["Salmon"] = 88] = "Salmon";
    Carryable[Carryable["CookedSalmon"] = 89] = "CookedSalmon";
    Carryable[Carryable["CookedVenison"] = 90] = "CookedVenison";
    Carryable[Carryable["Feather"] = 91] = "Feather";
})(Carryable = exports.Carryable || (exports.Carryable = {}));
var BlockIndex = /** @class */ (function () {
    function BlockIndex(x, y, region) {
        this.x = x;
        this.y = y;
        this.region = region;
    }
    return BlockIndex;
}());
exports.BlockIndex = BlockIndex;
var WorldIndex = /** @class */ (function () {
    function WorldIndex(x, y) {
        this.x = x;
        this.y = y;
    }
    return WorldIndex;
}());
exports.WorldIndex = WorldIndex;
var Material;
(function (Material) {
    Material[Material["Air"] = 0] = "Air";
    Material[Material["Dirt"] = 1] = "Dirt";
    Material[Material["Stone"] = 2] = "Stone";
    Material[Material["CopperOre"] = 3] = "CopperOre";
    Material[Material["TinOre"] = 4] = "TinOre";
    Material[Material["CherryLog"] = 5] = "CherryLog";
    Material[Material["CherryLeaves"] = 6] = "CherryLeaves";
    Material[Material["Bedrock"] = 7] = "Bedrock";
    Material[Material["Moss"] = 8] = "Moss";
    Material[Material["Flytrap"] = 9] = "Flytrap";
    Material[Material["Water"] = 10] = "Water";
    Material[Material["PiledStone"] = 11] = "PiledStone";
    Material[Material["CherryWood"] = 12] = "CherryWood";
    Material[Material["CypressLog"] = 13] = "CypressLog";
    Material[Material["Cypress"] = 14] = "Cypress";
    Material[Material["CypressPines"] = 15] = "CypressPines";
    Material[Material["RedwoodLog"] = 16] = "RedwoodLog";
    Material[Material["Redwood"] = 17] = "Redwood";
    Material[Material["RedwoodPines"] = 18] = "RedwoodPines";
    Material[Material["IcePlant"] = 19] = "IcePlant";
    Material[Material["Fern"] = 20] = "Fern";
})(Material = exports.Material || (exports.Material = {}));
var Biome;
(function (Biome) {
    Biome[Biome["Prairie"] = 0] = "Prairie";
    Biome[Biome["PeatBog"] = 1] = "PeatBog";
    Biome[Biome["Marsh"] = 2] = "Marsh";
    Biome[Biome["Mountain"] = 3] = "Mountain";
    Biome[Biome["Desert"] = 4] = "Desert";
    Biome[Biome["River"] = 5] = "River";
    Biome[Biome["Beach"] = 6] = "Beach";
    Biome[Biome["Settlement"] = 7] = "Settlement";
    Biome[Biome["Harbor"] = 8] = "Harbor";
})(Biome = exports.Biome || (exports.Biome = {}));
var Region = /** @class */ (function () {
    function Region(id, biome, map) {
        this.id = id;
        this.biome = biome;
        this.map = map;
    }
    return Region;
}());
exports.Region = Region;
exports.RegionalMap = [[]];
exports.Regions = [new Region(0, Biome.Prairie, exports.RegionalMap)];
exports.SelectedRegion = exports.Regions[0];
var PrairieStructure;
(function (PrairieStructure) {
    PrairieStructure[PrairieStructure["CherryTree"] = 0] = "CherryTree";
    PrairieStructure[PrairieStructure["Boulder"] = 1] = "Boulder";
})(PrairieStructure = exports.PrairieStructure || (exports.PrairieStructure = {}));
var PeatBogStructure;
(function (PeatBogStructure) {
})(PeatBogStructure = exports.PeatBogStructure || (exports.PeatBogStructure = {}));
var Structure = /** @class */ (function () {
    function Structure() {
    }
    return Structure;
}());
exports.Structure = Structure;
var BoulderType;
(function (BoulderType) {
    BoulderType[BoulderType["small"] = 0] = "small";
    BoulderType[BoulderType["long"] = 1] = "long";
    BoulderType[BoulderType["tall"] = 2] = "tall";
})(BoulderType = exports.BoulderType || (exports.BoulderType = {}));
var Boulder = /** @class */ (function (_super) {
    __extends(Boulder, _super);
    function Boulder(x, y, type) {
        var _this = _super.call(this) || this;
        _this.index = new BlockIndex(x, y, exports.SelectedRegion);
        _this.blocks = [];
        _this.type = type;
        var size;
        if (_this.type === BoulderType.small)
            size = 3;
        else
            size = 5;
        for (var i = 0; i < size; i++) {
            var b = new Block(new BlockIndex(_this.index.x, _this.index.y, exports.SelectedRegion), Material.Stone);
            if (_this.type === BoulderType.small) {
                if (i > 0)
                    b.index.x++;
                if (i === 2)
                    b.index.y++;
            }
            else if (_this.type === BoulderType.long) {
                if ([1, 3].indexOf(i) > -1)
                    b.index.x++;
                if ([2, 4].indexOf(i) > -1)
                    b.index.x = b.index.x + 2;
                if (i > 2)
                    b.index.y++;
            }
            else if (_this.type === BoulderType.tall) {
                if ([1, 3].indexOf(i) > -1)
                    b.index.x++;
                if (i === 4)
                    b.index.y = b.index.y + 2;
                if ([2, 3].indexOf(i) > -1)
                    b.index.y++;
            }
            if (Math.random() < 0.25)
                b.material = Material.CopperOre;
            else if (Math.random() < 0.333)
                b.material = Material.TinOre;
            _this.blocks.push(b);
        }
        return _this;
    }
    return Boulder;
}(Structure));
exports.Boulder = Boulder;
var CherryTree = /** @class */ (function (_super) {
    __extends(CherryTree, _super);
    function CherryTree(x, y) {
        var _this = _super.call(this) || this;
        _this.index = new BlockIndex(x, y, exports.SelectedRegion);
        _this.blocks = [];
        for (var i = 0; i < 9; i++) { // move around in a 3x3 grid pattern, starting top left
            var b = void 0;
            if (i < 6) {
                var bx = x;
                var by = y;
                if (i > 2)
                    by++;
                else
                    by += 2;
                if ([1, 2, 4, 5].indexOf(i) > -1)
                    bx++;
                if (i === 2 || i === 5)
                    bx++;
                b = new Block(new BlockIndex(bx, by, exports.SelectedRegion), Material.CherryLeaves);
            }
            else
                b = new Block(new BlockIndex(x + 1, y, exports.SelectedRegion), Material.CherryLog);
            if ([1, 2, 3, 4, 5, 7].indexOf(i) > -1)
                _this.blocks.push(b);
        }
        return _this;
    }
    return CherryTree;
}(Structure));
exports.CherryTree = CherryTree;
var Hero = /** @class */ (function () {
    function Hero(socket, name) {
        this.hotbar = [null, null, null, null, null, null, null, null, null, null];
        this.online = true;
        this.region = exports.SelectedRegion;
        this.socket = socket;
        this.name = name;
        this.hotbar[0] = Carryable.StoneTool;
        var x = Math.floor(exports.REGION_WIDTH / 2);
        for (var y = 0; y < exports.REGION_HEIGHT; y++) {
            if (exports.RegionalMap[x][y].material !== Material.Dirt && exports.RegionalMap[x][y].material !== Material.Bedrock) {
                this.x = x;
                this.y = y;
                exports.RegionalMap[x][y].select(this);
                return;
            }
        }
    }
    Hero.prototype.moveX = function (amt) {
        this.x += amt;
        if (this.x > exports.REGION_WIDTH - 0.5)
            this.x = exports.REGION_WIDTH - 0.5;
        if (this.x < 1)
            this.x = 1;
        // noinspection JSSuspiciousNameCombination
        exports.RegionalMap[this.x - Math.floor(this.x) < 0.75 ? Math.floor(this.x) : Math.ceil(this.x)][this.y - Math.floor(this.y) < 0.75 ? Math.floor(this.y) : Math.ceil(this.y)].select(this);
        this.pingPos();
    };
    Hero.prototype.pingClosed = function (hero) {
        this.socket.send('{"type": "pingclosed", "name": "' + hero.name + '"}');
    };
    Hero.prototype.pingPos = function () {
        var playerpos = '';
        for (var i = 0; i < exports.Heroes.length; i++) {
            if (exports.Heroes[i].online)
                playerpos += '"' + exports.Heroes[i].name + '": {"x": ' + exports.Heroes[i].x + ', "y": ' + exports.Heroes[i].y + ', "region": "' + exports.Heroes[i].region.id + '"},';
        }
        playerpos = playerpos.substring(0, playerpos.length - 1);
        this.socket.send('{"type": "pingpos", "players": {' + playerpos + '}}');
    };
    Hero.prototype.pingJoined = function (hero) {
        this.socket.send('{"type": "pingjoined", "name": "' + hero.name + '"}');
    };
    Hero.prototype.pickup = function (carryable) {
        for (var i = 0; i < 10; i++) {
            if (this.hotbar[i] === null) {
                this.hotbar[i] = carryable;
                return true;
            }
        }
        return false;
    };
    Hero.prototype.disconnect = function () {
        this.online = false;
        for (var i = 0; i < exports.Heroes.length; i++) {
            exports.Heroes[i].pingClosed(this);
        }
    };
    Hero.prototype.reconnect = function () {
        this.online = true;
        for (var i = 0; i < exports.Heroes.length; i++) {
            exports.Heroes[i].pingJoined(this);
        }
    };
    return Hero;
}());
exports.Hero = Hero;
exports.Heroes = [];
