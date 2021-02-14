const HOST = location.origin.replace(/^http/, 'ws');
const Carryable = ['Copper','Tin','Stone','CherryLog','StoneTool','BronzeCherryAxe','BronzeCherryPickAxe','BuzzBronzeCherryAxe','BuzzBronzeCherryPickAxe','DarkBronzeCherryAxe','DarkBronzeCherryPickAxe','Moss','FlytrapSeed','Cherry','CypressLog','CypressCone','RedwoodCone','RedwoodLog','Bronze','BuzzBronze','DarkBronze','Slime','Glass','SlimeGlass','Clay','BronzeCypressAxe','BronzeCypressPickAxe','BuzzBronzeCypressAxe','BuzzBronzeCypressPickaxe','DarkBronzeCypressAxe','DarkBronzeCypressPickAxe','BronzeRedwoodAxe','BronzeRedwoodPickAxe','BuzzBronzeRedwoodAxe','BuzzBronzeRedwoodPickAxe','DarkBronzeRedwoodAxe','DarkBronzeRedwoodPickaxe','BronzeArmor','BuzzBronzeArmor','DarkBronzeArmor','Necrum','Zipium','SlimyBronzeCherryAxe','SlimyBuzzBronzeCherryAxe','SlimyDarkBronzeCherryAxe','SlimyBronzeCypressAxe','SlimyBuzzBronzeCypressAxe','SlimyDarkBronzeCypressAxe','SlimyBronzeRedwoodAxe','SlimyBuzzBronzeRedwoodAxe','SlimyDarkBronzeRedwoodAxe','SlimyBronzeArmor','SlimyBuzzBronzeArmor','SlimyDarkBronzeArmor','GlassedBronzeArmor','GlassedBuzzBronzeArmor','GlassedDarkBronzeArmor','SlimeGlassBronzeArmor','SlimeGlassBuzzBronzeArmor','SlimeGlassDarkBronzeArmor','SiliconBronzeArmor','SiliconBuzzBronzeArmor','SiliconDarkBronzeArmor','ReinforcedBronzeArmor','ReinforcedBuzzBronzeArmor','ReinforcedDarkBronzeArmor','Sand','CherryWood','Redwood','Cypress','IcePlant','Fern','Rye','Bread','Venison','Antler','Bone','DeerPelt','RedPaintedCherryWood','WhitePaintedCherryWood','BlackPaintedCherryWood','RedPaintedRedwood','WhitePaintedRedwood','BlackPaintedRedWood','RedPaintedCypress','WhitePaintedCypress','BlackPaintedCypress','Abalone','Salmon','CookedSalmon','CookedVenison','Feather'];
let hotbar = ['', '', '', '', '', '', '', '', '', ''];
let $screen = document.getElementById('screen');
let $hotbar = document.getElementById('hotbar');
$screen.width = Math.floor(innerWidth-100);
$screen.height = Math.floor(innerHeight-100);
$hotbar.height = 355;
$hotbar.width = 40;
let REGION_HEIGHT = 64;
let REGION_WIDTH = 127;
let WUNIT = Math.round($screen.width/REGION_WIDTH)*6;
let HUNIT = Math.round($screen.height/REGION_HEIGHT)*6;
let ctx = $screen.getContext('2d');
let ctx2 = $hotbar.getContext('2d');
let joinedmessage = true;
let name = '';
let players = {};
let updatetimeout;

let smallrocksheet = new Image();
smallrocksheet.src = 'img/smallrocksheet.png';
let bigrocksheet = new Image();
bigrocksheet.src = 'img/bigrocksheet.png';
let smallrockcoppersheet = new Image();
smallrockcoppersheet.src = 'img/smallrockcoppersheet.png';
let bigrockcoppersheet = new Image();
bigrockcoppersheet.src = 'img/bigrockcoppersheet.png';
let smallrocktinsheet = new Image();
smallrocktinsheet.src = 'img/smallrocktinsheet.png';
let bigrocktinsheet = new Image();
bigrocktinsheet.src = 'img/bigrocktinsheet.png';
let cherrysheet = new Image();
cherrysheet.src = 'img/cherrysheet.png';
let herosheet = new Image();
herosheet.src = 'img/herosheet.png';
let dirtsheet = new Image();
dirtsheet.src = 'img/dirtsheet.png';
let bedrocksheet = new Image();
bedrocksheet.src = 'img/bedrocksheet.png';

let drawfullmap = (map, selected) => {
  // console.log('drawing map');
  let textmap = map;
  let selected_block = selected;
  let hero = {};
  for (p in players) {
    if (p === name && players.hasOwnProperty(p)) {
      hero = players[p];
    }
  }
  let transposed = [];
  for (let y = 0; y < REGION_HEIGHT; y++) {
    transposed.push(textmap.split('<br>')[y].split(''));
  }
  let RegionalMap = transposed[0].map((_, colIndex) => transposed.map(row => row[colIndex]));
  // noinspection SillyAssignmentJS
  $screen.width = $screen.width;
  let grid = ctx.createLinearGradient(50,0,100,2*$screen.height);
  grid.addColorStop(1, "#ffbb00");
  grid.addColorStop(0, "#ddffff");
  ctx.fillStyle = grid;
  ctx.fillRect(0, 0, $screen.width, $screen.height);
  ctx.translate(Math.floor(-(hero.x-1)*WUNIT+(REGION_WIDTH*WUNIT/13)), Math.floor(-(REGION_HEIGHT-hero.y-1)*HUNIT+(REGION_HEIGHT*HUNIT/8)));
  for (let y = 0; y < REGION_HEIGHT; y++) {
    for (let x = 0; x < REGION_WIDTH; x++) {
      let sheet;
      let imgx;
      let imgy;
      let block = RegionalMap[x][y];
      if (block === 'D') {
        sheet = dirtsheet;
        let labr = (80,160);
        let lab = (160,160);
        let abr = (0,160);
        let ab = (240,0);
        let lbr = (80,80);
        let lb = (160,80);
        let br = (0,80);
        let b = (80,160);
        let lar = (80,240);
        let la = (160,240);
        let ar = (0,240);
        let a = (1000,1000);
        let lr = (240,160);
        let l = (160,240);
        let r = (0,240);
        let no = (240,80);
        imgx, imgy = gettexture(RegionalMap, x, y, labr, lab, abr, ab, lbr, lb, br, b, lar, la, ar, a, lr, l, r, no, ['D']);
      } else if (block === 'B') {
        sheet = bedrocksheet;
        let labr = (80, 160);
        let lab = (160,160);
        let abr = (0,160);
        let ab = (240,0);
        let lbr = (80,80);
        let lb = (160,80);
        let br = (0,80);
        let b = (80,160);
        let lar = (80,240);
        let la = (160,240);
        let ar = (0,240);
        let a = (1000,1000);
        let lr = (240,160);
        let l = (160,240);
        let r = (0,240);
        let no = (240,80);
        imgx, imgy = gettexture(RegionalMap, x, y, labr, lab, abr, ab, lbr, lb, br, b, lar, la, ar, a, lr, l, r, no, ['B']);
      } else if (['S', 'T', 'C'].includes(block)) {
        imgx, imgy, sheet = gettexture(RegionalMap, x, y, (80, 160, bigrocksheet), (160, 160, bigrocksheet), (0, 160, bigrocksheet), (240, 160, bigrocksheet), (80, 80, bigrocksheet), (160, 80, bigrocksheet), (0, 80, bigrocksheet), (80, 160, smallrocksheet), (80, 240, bigrocksheet), (160, 240, bigrocksheet), (0, 240, bigrocksheet), (240, 160, bigrocksheet), (160, 240, smallrocksheet), (0, 240, smallrocksheet), (240, 80, smallrocksheet), (240, 80, bigrocksheet), ['S', 'T', 'C']);
      } else if (block === 'L') {
        sheet = cherrysheet;
        imgx, imgy = gettexture(RegionalMap, x, y, (0,0), (160,160), (0,160), (0,0), (160,0), (240,0), (0,80), (240,240), (160,80), (240,80), (80,80), (160,80), (80, 160), (160,160), (0,160), (240,240), ['L']);
      } else if (block === 'H') {
        sheet = cherrysheet;
        imgx = 80; imgy = 240;
      } else {
        sheet = new Image();
        imgx = 0; imgy = 0;
      }
      ctx.drawImage(sheet, imgx, imgy, 80, 80, x*WUNIT, y*HUNIT, WUNIT, HUNIT);
    }
  }
  if (RegionalMap[selected_block[0]-1] && RegionalMap[selected_block[0]-1][(REGION_HEIGHT - selected_block[1] - 1)] !== ' ') {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    ctx.strokeRect((selected_block[0]-1) * WUNIT, (REGION_HEIGHT - selected_block[1] - 1) * HUNIT, WUNIT, HUNIT);
  }
  for (let i = 0; i < Object.values(players).length; i++) {
    // console.log(Object.values(players)[i].walking, Object.values(players)[i].right);
    ctx.drawImage(herosheet, (Object.values(players)[i].walking? (+Date.now()%2===0? 0 : 80): 160), (Object.values(players)[i].right? 240 : 160), 80, 80, (Object.values(players)[i].x-1) * WUNIT, (REGION_HEIGHT - Object.values(players)[i].y - 1) * HUNIT, WUNIT, HUNIT);
  }
};
function drawhotbar(newhotbar) {
  ctx2.fillStyle = '#b8c8d2';
  ctx2.fillRect(0, 0, $hotbar.width, $hotbar.height);
  hotbar = newhotbar;
  for (let i = 0; i < 10; i++) {
    if (Carryable[hotbar[i]] === 'Copper') {
      ctx2.fillStyle = '#dfba85';
    } else
    if (Carryable[hotbar[i]] === 'Tin') {
      ctx2.fillStyle = '#dcdfd6';
    } else
    if (Carryable[hotbar[i]] === 'Stone') {
      ctx2.fillStyle = 'darkgrey';
    } else
    if (Carryable[hotbar[i]] === 'CherryLog') {
      ctx2.fillStyle = '#87331e';
    } else
    if (Carryable[hotbar[i]] === 'StoneTool') {
      ctx.fillStyle = '#faf';
    } else {
      ctx2.fillStyle = '#b8c8d2';
    }
    ctx2.fillRect(5, 5+(i*35), 30, 30);
  }
}
function start() {
  let socket = new WebSocket(HOST);
  socket.onopen = () => {socket.send('getworld')};
  socket.onclose = () => setTimeout(start, 5);
  document.body.addEventListener('keydown', e=>{
    if (e.code === "KeyD") {
      socket.send('right');
    }
    if (e.code === "KeyA") {
      socket.send('left');
    }
    if (e.code === "KeyL") {
      socket.send('use');
    }
  });
  socket.onmessage = function (event) {
    // console.log(event.data)
    let msg = JSON.parse(event.data);
    if (msg.type === 'confirm') {
      drawfullmap(msg.map, msg.selected);
      drawhotbar(msg.hotbar)
    }
    if (msg.type === 'pingjoined') {
      if (joinedmessage) {
        joinedmessage = false;
        name = msg.name;
      }
      // console.log(msg.name+' joined.');
    }
    if (msg.type === 'pingpos') {
      // console.log('pingpos');
      let oldplayers = JSON.parse(JSON.stringify(players));
      let oldplayerslist = Object.values(oldplayers);
      players = msg.players;
      let playerslist = Object.values(players);
      for (let i = 0; i < playerslist.length; i++) {
        if (oldplayerslist[i]) {
          if (playerslist[i].x > oldplayerslist[i].x) {
            playerslist[i].walking = true;
            playerslist[i].right = true;
            // console.log(JSON.parse(JSON.stringify({'new':playerslist, 'old':oldplayerslist})));
          }
          if (playerslist[i].x < oldplayerslist[i].x) {
            playerslist[i].walking = true;
            playerslist[i].right = false;
          }
          if (playerslist[i].x === oldplayerslist[i].x) {
            playerslist[i].walking = false; playerslist[i].right = playerslist[i].right || false;
          }
        } else {/*console.log(oldplayerslist);*/ playerslist[i].walking = false; playerslist[i].right = false;}
      }
      clearTimeout(updatetimeout);
      updatetimeout = setTimeout(()=>{
          for (let i = 0; i < Object.values(players).length; i++) {
            Object.values(players)[i].walking = false;
          }
      }, 1000)
    }
  }
}
herosheet.onload = start;


function gettexture(map, x, y, labr, lab, abr, ab, lbr, lb, br, b, lar, la, ar, a, lr, l, r, no, options) {
  let selection;
  if (options[0] === 'D') console.log('----'+x+','+y+'-----');
  if (map[x][y + 1] && options.includes(map[x][y + 1])) {
    // the block below is the same
    if (options[0] === 'D') console.log(options[0], 'b');
    if (map[x][y - 1] && options.includes(map[x][y - 1])) {
      if (options[0] === 'D') console.log(options[0], 'a');
      // the block above is the same
      if (map[x - 1] && options.includes(map[x - 1][y])) {
        // the block to the left is the same
        if (options[0] === 'D') console.log(options[0], 'l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres similar blocks on all sides
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = labr;
        } else {
          // theres similar blocks to the left, above, and below, but not to the right
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = lab;
        }
      } else {
        // the block to the left is different
        if (options[0] === 'D') console.log(options[0], 'no l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres similar blocks above and below and to the right, but not to the left
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = abr;
        } else {
          // theres similar blocks above and below but not to either side
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = ab;
        }
      }
    } else {
      // the block above is different
      if (options[0] === 'D') console.log(options[0], 'no a');
      if (map[x - 1] && options.includes(map[x - 1][y])) {
        // the block to the left is the same
        if (options[0] === 'D') console.log(options[0], 'l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres similar blocks below, to the right, and to the left, but not above
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = lbr;
        } else {
          // theres similar blocks below and to the left but not to the right or above
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = lb;
        }
      } else {
        // the block to the left is different
        if (options[0] === 'D') console.log(options[0], 'no l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres similar blocks below and to the right but not to the left or above
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = br;
        } else {
          // theres a similar block below but not anywhere else
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = b;
        }
      }
    }
  } else {
    // the block below is different
    if (options[0] === 'D') console.log(options[0], 'no b');
    if (map[x][y - 1] && options.includes(map[x][y - 1])) {
      // the block above is the same
      if (options[0] === 'D') console.log(options[0], 'a');
      if (map[x - 1] && options.includes(map[x - 1][y])) {
        // the block to the left is the same
        if (options[0] === 'D') console.log(options[0], 'l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres similar blocks above and to either side but not below
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = lar;
        } else {
          // theres similar blocks above and to the left but not the right or below
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = la;
        }
      } else {
        // the block to the left is different
        if (options[0] === 'D') console.log(options[0], 'no l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          // theres stone above and to the right but not to the left or below
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = ar;
        } else {
          // theres similar blocks above but not anywhere else
          if (options[0] === 'D') console.log(options[0], 'no r');
          // todo but the situation is currently impossible
        }
      }
    } else {
      // the block above is different
      if (options[0] === 'D') console.log(options[0], 'no a');
      if (map[x - 1] && options.includes(map[x - 1][y])) {
        // the block to the left is the same
        if (options[0] === 'D') console.log(options[0], 'l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          //----theres similar blocks to either side but not below or above
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = lr;
        } else {
          //----theres a similar block to the left but not anywhere else
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = l;
        }
      } else {
        // the block to the left is different
        if (options[0] === 'D') console.log(options[0], 'no l');
        if (map[x + 1] && options.includes(map[x + 1][y])) {
          //----theres a similar block to the right and nowhere else
          if (options[0] === 'D') console.log(options[0], 'r');
          selection = r;
        } else {
          //----theres no similar blocks around
          if (options[0] === 'D') console.log(options[0], 'no r');
          selection = no;
        }
      }
    }
  }
  return selection
}