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
    return Block;
}());
exports.Block = Block;
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
    Material[Material["Leaf"] = 6] = "Leaf";
    Material[Material["Bedrock"] = 7] = "Bedrock";
})(Material = exports.Material || (exports.Material = {}));
var Biome;
(function (Biome) {
    Biome[Biome["Prairie"] = 0] = "Prairie";
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
                b = new Block(new BlockIndex(bx, by, exports.SelectedRegion), Material.Leaf);
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
        this.region = exports.SelectedRegion;
        this.socket = socket;
        this.name = name;
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
        if (this.x > exports.REGION_WIDTH - 1.5)
            this.x = exports.REGION_WIDTH - 1.5;
        if (this.x < 0)
            this.x = 0;
        // noinspection JSSuspiciousNameCombination
        exports.RegionalMap[Math.floor(this.x)][Math.floor(this.y)].select(this);
        this.pingPos();
    };
    Hero.prototype.pingClosed = function (hero) {
        this.socket.send('{"type": "pingclosed", "name": "' + hero.name + '"}');
    };
    Hero.prototype.pingPos = function () {
        var playerpos = '{';
        for (var i = 0; i < exports.Heroes.length; i++) {
            playerpos += '"' + exports.Heroes[i].name + '": {"x": ' + exports.Heroes[i].x + ', "y": ' + exports.Heroes[i].y + ', "region": "' + exports.Heroes[i].region.id + '"},';
        }
        playerpos = playerpos.substring(0, playerpos.length - 1) + '}';
        this.socket.send('{"type": "pingpos", "players": ' + playerpos + '}');
    };
    Hero.prototype.pingJoined = function (hero) {
        this.socket.send('{"type": "pingjoined", "name": "' + hero.name + '"}');
    };
    return Hero;
}());
exports.Hero = Hero;
exports.Heroes = [];
