const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 2;
const BRICK_COLS = 40;
const BRICK_ROWS = 30;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;
var levelTurns = 6; //place holder.
var wallEdges = [];
var barrelCoords = [];
var crateCoords = [];
var wallStartX;
var wallStartY;
var wallEndX;
var wallEndY;
var cameraRightMostCol;
var cameraBottomMostRow;
var brickLeftEdgeX;
var brickTopEdgeY;
var brickRightEdgeX;
var brickBottomEdgeY;
var firstTileGridPassComplete = false;

var blank_level_template = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

var level1 =  [ // the original level as used during development
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 10, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 4, 4, 4, 3, 0, 0, 9, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 8, 0, 3, 4, 0, 4, 4, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
    1, 0, 3, 1, 1, 0, 0, 0, 4, 3, 0, 1, 0, 3, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 5, 1, 1, 0, 0, 0, 0, 2, 0, 1, 0, 2, 1, 0, 0, 0, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 5, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 0, 0, 0, 5, 0, 1, 1, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1,
    1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
    1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 1,
    1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 6, 0, 2, 0, 1,
    1, 1, 3, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 3, 1, 0, 4, 4, 0, 4, 1, 0, 0, 0, 0, 0, 0, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 0, 1, 0, 2, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 1,
    1, 0, 0, 0, 0, 0, 4, 3, 4, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 1,
    1, 3, 4, 4, 4, 0, 0, 2, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1,
    1, 2, 0, 0, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1,
    1, 2, 0, 0, 0, 0, 0, 2, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1, 1,
    1, 4, 0, 0, 0, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 1, 1,
    1, 0, 3, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1,
    1, 0, 2, 1, 0, 5, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 5, 1, 1, 2, 0, 0, 0, 0, 7, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 0, 1,
    1, 0, 2, 1, 0, 2, 6, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 2, 1, 1, 5, 0, 0, 0, 0, 8, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

var level2 = [ // king of the hill
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,4,4,4,4,4,3,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,0,10,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,2,0,0,0,0,3,4,4,4,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,1,
    1,0,0,0,0,0,4,4,4,4,4,3,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,9,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,1,1,
    1,7,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,9,7,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,8,0,0,0,0,0,0,0,0,0,4,4,4,4,3,0,0,0,0,0,0,1,8,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,
    1,1,4,4,4,4,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,2,1,1,1,0,0,0,0,1,
    1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,1,0,0,0,0,0,0,3,4,4,1,0,0,0,0,0,0,1,
    1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,
    1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,3,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,4,4,4,4,4,3,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,3,9,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,2,1,1,2,4,4,3,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,3,4,4,2,1,1,1,1,1,1,1,1,2,4,4,3,0,0,0,0,0,0,0,2,0,0,0,1,
    1,0,0,0,0,0,0,0,0,3,4,4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,4,3,0,0,0,0,2,0,0,0,1,
    1,9,0,0,0,0,3,4,4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,4,3,0,2,0,0,0,1,
    1,9,9,3,4,4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,4,3,0,0,1,
    1,4,4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,4,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

var level3 = [ // the old mine
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,3,4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,3,4,4,4,4,4,3,0,0,0,1,
    1,0,2,0,2,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,10,0,8,0,0,2,0,0,0,0,0,2,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,3,4,3,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,3,0,1,1,1,1,1,1,1,1,0,0,0,0,2,0,2,0,0,9,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,
    1,1,0,0,7,0,0,0,0,1,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,
    1,1,1,0,8,0,0,0,0,0,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,
    1,1,1,1,1,1,1,4,3,0,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,
    1,1,1,1,1,1,1,0,2,0,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,
    1,1,1,1,0,0,0,0,2,0,0,1,1,0,0,0,2,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,2,0,0,1,1,1,
    1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,2,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,2,0,0,1,1,1,
    1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2,0,0,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,10,0,1,1,1,1,1,1,1,1,
    1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

];

// an array containing all known levels
var allLevels = [level1, level2, level3];
// the current level data to use
var levelTileGrid = allLevels[0];

const EMPTY_TILE = 0;
const WALL_TILE = 1;
const LADDER_TILE = 2;
const LADDER_PLATFORM_TILE = 3;
const PLATFORM_TILE = 4;
const LADDER_BROKEN_TILE = 5;

const CACTUS_TILE = 6;
const CACTUSTOP_TILE = 7;
const CACTUSBOTTOM_TILE = 8;

const CRATE = 9;
const RED_BARREL = 10;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomLevel() { // =) just for fun

    console.log("Generating a random level!");

    var newLevel = [];

    for (var i = 0; i < blank_level_template.length; i++) {
        newLevel[i] = blank_level_template[i];
        if (newLevel[i] == 0) { // empty space? maybe fill it
            // pure random junk noise - not fun
            // var chance = Math.random();
            // if (chance<0.05) { newLevel[i] = PLATFORM_TILE; } // common
            // else if (chance<0.1) { newLevel[i] = WALL_TILE; } // average
            // else if (chance<0.12) { newLevel[i] = getRandomInt(EMPTY_TILE,RED_BARREL); }
        }
    }

    // procgen level v2 - make them "fun-ish"
    
    // add some floors
    for (var num = 0; num < 15; num++) {
        var start = getRandomInt(0,newLevel.length); // pick a tile
        var width = getRandomInt(3,10); // length of platform
        for (var tile=0; tile<width; tile++) { // build it
            var i = start+tile; // map array index
            if (newLevel[i] == 0) { // only replace empty space

                // if we're in the very center of the platform, add a ladder
                if (tile==width/2) {
                    var height = getRandomInt(3,16); // height of ladder
                    for (var step=0; step<height; step++) { // build it
                        var pos = i + (step*BRICK_COLS);
                        if (newLevel[pos] == 0) {
                            newLevel[pos] = step?LADDER_TILE:LADDER_PLATFORM_TILE;
                        }
                    }
                } else { // normal part of the platform

                    newLevel[i] = PLATFORM_TILE;

                }

            }
        }
    }

    // add some walls
    for (var num = 0; num < 10; num++) {
        var start = getRandomInt(0,newLevel.length);
        var width = getRandomInt(3,9);
        var height = getRandomInt(3,9);
        for (var w=0; w<width; w++) {
            for (var h=0; h<height; h++) {
                var i = start+w+(h*BRICK_COLS);
                if (newLevel[i] == 0) {
                    newLevel[i] = WALL_TILE;
                    // occasionally we get a cactus on top
                    if (h==0 && Math.random()<0.1) {
                        var cacpos = i-BRICK_COLS;
                        if (cacpos>0 && newLevel[cacpos]==0)
                            newLevel[cacpos] = CACTUS_TILE;
                    }

                }
            }
        }
    }

    // time for some crates, tnt, and cactii
    for (var num = 0; num < 10; num++) {
        var start = getRandomInt(0,newLevel.length);
        var width = getRandomInt(3,9);
        var height = getRandomInt(3,9);
        for (var w=0; w<width; w++) {
            for (var h=0; h<height; h++) {
                var i = start+w+(h*BRICK_COLS);
                if (newLevel[i] == 0) {
                    newLevel[i] = WALL_TILE;
                }
            }
        }
    }



    return newLevel;
}

function drawGroundBlocks() {

    wallEdges = [];

    var cameraLeftMostCol = Math.floor(camPanX / BRICK_W);
    var cameraTopMostRow = Math.floor(camPanY / BRICK_H);

    // how many columns and rows of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(canvas.width / BRICK_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height / BRICK_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 and + 2 on each pushes the new tile popping in off visible area
    // +2 for columns since BRICK_W doesn't divide evenly into canvas.width
    cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
    cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    for (var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
        for (var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {

            brickLeftEdgeX = eachCol * BRICK_W;
            brickTopEdgeY = eachRow * BRICK_H;
            brickRightEdgeX = brickLeftEdgeX + BRICK_W;
            brickBottomEdgeY = brickTopEdgeY + BRICK_H;

            if (isWallTileAtLevelTileCoord(eachCol, eachRow)) {
                canvasContext.drawImage(wallInteriorPic, brickLeftEdgeX, brickTopEdgeY);
                createVertLeftFacingWallEdges(eachCol, eachRow);
            } else {
                createVertRightFacingWallEdges(eachCol, eachRow);
                drawWallVertEdges(eachCol, eachRow);
            } // end of isWallTileAtLevelTileCoord()

            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === LADDER_TILE) {
                canvasContext.drawImage(ladderPic, brickLeftEdgeX, brickTopEdgeY);
            }
            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === LADDER_PLATFORM_TILE) {
                canvasContext.drawImage(ladderPlatformPic, brickLeftEdgeX, brickTopEdgeY);
            }
            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === PLATFORM_TILE) {
                canvasContext.drawImage(platformPic, brickLeftEdgeX, brickTopEdgeY);
            }
            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === LADDER_BROKEN_TILE) {
                canvasContext.drawImage(ladderBrokenPic, brickLeftEdgeX, brickTopEdgeY);
            }

            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === CACTUS_TILE) {
                canvasContext.drawImage(cactusPic, brickLeftEdgeX, brickTopEdgeY);
            }
            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === CACTUSTOP_TILE) {
                canvasContext.drawImage(cactusTopPic, brickLeftEdgeX, brickTopEdgeY);
            }
            if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === CACTUSBOTTOM_TILE) {
                canvasContext.drawImage(cactusBottomPic, brickLeftEdgeX, brickTopEdgeY);
            }

            if (!firstTileGridPassComplete) {

                if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === CRATE) {
                    var crateCoord = {
                        col: eachCol,
                        row: eachRow
                    };
                    crateCoords.push(crateCoord);
                }
                if (levelTileGrid[levelTileIndexAtColRowCoord(eachCol, eachRow)] === RED_BARREL) {
                    var barrelCoord = {
                        col: eachCol,
                        row: eachRow
                    };
                    barrelCoords.push(barrelCoord);
                }
            }

        } // end of for eachRow
    } // end of for eachCol

    firstTileGridPassComplete = true;

    for (var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
        for (var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {

            brickLeftEdgeX = eachCol * BRICK_W;
            brickTopEdgeY = eachRow * BRICK_H;
            brickRightEdgeX = brickLeftEdgeX + BRICK_W;
            brickBottomEdgeY = brickTopEdgeY + BRICK_H;

            if (isWallTileAtLevelTileCoord(eachCol, eachRow)) {
                createHorTopFacingWallEdges(eachCol, eachRow);
            } else {
                createHorBottomFacingWallEdges(eachCol, eachRow);
                drawWallHorEdges(eachCol, eachRow);
            } // end of isWallTileAtLevelTileCoord()
        }
    }

    for (i = 0; i < wallEdges.length; i++) {
        wallEdges[i].angle = angleFromLine(wallEdges[i]);
        if (debugMode) {
            //Commented out because it causes slowdown.  Only needed when troubleshooting wall edge colliders.
            //colorLine(wallEdges[i].x1, wallEdges[i].y1, wallEdges[i].x2, wallEdges[i].y2);
        }
    }

} // end of drawGroundBlocks()

function spawnCrates() {
    if (crates.length < crateCoords.length) {
        for (i = 0; i < crateCoords.length; i++) {
            crates[i] = new destructableObjectClass('CRATE');
            crates[i].objectSpawn(crateCoords[i].col, crateCoords[i].row)
            crateCoords.splice(i, 1);
        }
    }
}

function spawnBarrels() {
    if (barrels.length < barrelCoords.length) {
        for (i = 0; i < barrelCoords.length; i++) {
            barrels[i] = new destructableObjectClass('BARREL');
            barrels[i].objectSpawn(barrelCoords[i].col, barrelCoords[i].row)
            barrelCoords.splice(i, 1);
        }
    }
}

function saveWallEdgeToList() {

    if (wallStartX === wallEndX || wallStartY === wallEndY) {
        wallEdges.push({
            x1: wallStartX,
            y1: wallStartY,
            x2: wallEndX,
            y2: wallEndY,
            angle: 0
        })
    }

    wallStartX = null;
    wallStartY = null;
    wallEndX = null;
    wallEndY = null;
}

function startWallEdge() {
    wallStartX = brickLeftEdgeX;
    wallStartY = brickTopEdgeY;
}

function endWallEdge(x, y) {
    wallEndX = x;
    wallEndY = y;
}

function createVertLeftFacingWallEdges(eachCol, eachRow) {
    if (!isWallTileAtLevelTileCoord(eachCol - 1, eachRow)) {
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachRow >= cameraBottomMostRow || isWallTileAtLevelTileCoord(eachCol, eachRow + 1)) {
            endWallEdge(brickLeftEdgeX, brickBottomEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createVertRightFacingWallEdges(eachCol, eachRow) {
    if (isWallTileAtLevelTileCoord(eachCol - 1, eachRow)) {
        //canvasContext.drawImage(wallRightIntPic, brickLeftEdgeX, brickTopEdgeY);
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachRow >= cameraBottomMostRow || isWallTileAtLevelTileCoord(eachCol, eachRow + 1)) {
            endWallEdge(brickLeftEdgeX, brickBottomEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createHorTopFacingWallEdges(eachCol, eachRow) {
    if (!isWallTileAtLevelTileCoord(eachCol, eachRow - 1)) {
        canvasContext.drawImage(wallTopPic, brickLeftEdgeX, brickTopEdgeY);
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachCol >= cameraRightMostCol || isWallTileAtLevelTileCoord(eachCol + 1, eachRow)) {
            endWallEdge(brickRightEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createHorBottomFacingWallEdges(eachCol, eachRow) {
    if (isWallTileAtLevelTileCoord(eachCol, eachRow - 1)) {
        //canvasContext.drawImage(wallBottomEdgePic, brickLeftEdgeX, brickTopEdgeY);
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachCol >= cameraRightMostCol || isWallTileAtLevelTileCoord(eachCol + 1, eachRow)) {
            endWallEdge(brickRightEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function drawWallHorEdges(eachCol, eachRow) {
    //if this tile is under a wall that is open to the left.
    if (isWallTileAtLevelTileCoord(eachCol, eachRow - 1) &&
        !isWallTileAtLevelTileCoord(eachCol - 1, eachRow - 1)) {

        canvasContext.drawImage(wallBottomEdgePic, brickLeftEdgeX, brickTopEdgeY);

        //if this tile is under a wall tile that is next to another wall tile on the left.
    } else if (isWallTileAtLevelTileCoord(eachCol, eachRow - 1) &&
        isWallTileAtLevelTileCoord(eachCol - 1, eachRow - 1)) {

        canvasContext.drawImage(wallBottomIntPic, brickLeftEdgeX, brickTopEdgeY);

    }

}

function drawWallVertEdges(eachCol, eachRow) {
    if (isWallTileAtLevelTileCoord(eachCol - 1, eachRow) &&
        !isWallTileAtLevelTileCoord(eachCol - 1, eachRow - 1)) {

        canvasContext.drawImage(wallRightTopPic, brickLeftEdgeX, brickTopEdgeY);

    } else if (isWallTileAtLevelTileCoord(eachCol - 1, eachRow) &&
        isWallTileAtLevelTileCoord(eachCol - 1, eachRow - 1)) {

        canvasContext.drawImage(wallRightIntPic, brickLeftEdgeX, brickTopEdgeY);

    } else if (!isWallTileAtLevelTileCoord(eachCol - 1, eachRow) &&
        isWallTileAtLevelTileCoord(eachCol - 1, eachRow - 1) &&
        !isWallTileAtLevelTileCoord(eachCol, eachRow - 1)) {

        canvasContext.drawImage(wallBottomRightCornerPic, brickLeftEdgeX, brickTopEdgeY);

    }
}