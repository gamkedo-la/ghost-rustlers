var playerNavGraph = [];
var currentPath = [];

function initNavGraph() {
	playerNavGraph = generateNavGraph(levelTileGrid, playerLegalMove);
	playerNavGraph = defineNeighbors(playerNavGraph, levelTileGrid);
}

function defineNeighbors(graph, levelGrid) {
	let current, neighbor,
		nGraph = graph.slice(0);
	for (let i = 0; i < nGraph.length; i++) {
		current = nGraph[i];
		for (let e = 0; e < nGraph.length; e++) {
			if (e === i) {
				continue;
			}
			neighbor = nGraph[e];

			//Connect adjacent nodes (within one tile)
			if (Math.abs(current.x - neighbor.x) <= 1 && Math.abs(current.y - neighbor.y) <= 1) {
				current.neighbors.push(e)
			//Account for falling
			} else if (Math.abs(current.x - neighbor.x) === 1 && neighbor.y > current.y) {
				for (let y = current.y; y <= neighbor.y; y++) {
					if (isSolidTile(levelGrid[y * BRICK_COLS + neighbor.x])) {
						break;
					} else if (y === neighbor.y) {
						current.neighbors.push(e)
					}
				}
			}
		}
	}

	return nGraph;
}

function graphSearch(start, end, graph) {
	let goal = graph[end];
	let frontier = [];
	frontier.push(start);

	let cameFrom = [];
	cameFrom[start] = null;

	while (frontier.length > 0) {
		let current = graph[frontier[0]],
			currentNeighbors = current.neighbors;

			if (current === goal) {
				cameFrom[frontier[0] = current];
				break;
			}

		for (let i = 0; i < currentNeighbors.length; i++) {
			if (cameFrom[currentNeighbors[i]] === undefined) {
				frontier.push(currentNeighbors[i]);
				cameFrom[currentNeighbors[i]] = frontier[0];
			}
		}
		frontier.shift();
	}
	return cameFrom;
}

function getPath(start, goal, searchGraph, navGraph) {
	let current = goal,
		path = [],
		pathCoords = [];
	if (searchGraph[goal] === undefined) {
		pathCoords.push(navGraph[start]);
		return pathCoords;
	}

	while (current != start) {
		path.unshift(current);
		current = searchGraph[current];
	}

	for (let p of path) {
		pathCoords.push(navGraph[p]);
	}
	return pathCoords;
}

function getPathfor(character, toX, toY, graph) {
	let start = getNearestNode(character.x, character.y, graph),
		goal = getNearestNode(toX, toY, playerNavGraph);

	let search = graphSearch(start, goal, graph);
		return getPath(start, goal, search, graph);
}

function getNearestNode(x, y, graph) {
	let graphX = colAtXCoord(x), 
		graphY = rowAtYCoord(y),
		leastDist = Infinity,
		leastIndex = 0;

	for (let node = 0; node < graph.length; node++) {
		let dist = Math.abs(graph[node].x - graphX) + Math.abs(graph[node].y - graphY);

		if (dist < leastDist) {
			leastDist = dist;
			leastIndex = node;
		}
	}

	return leastIndex;
}

function generateNavGraph(sourceGraph, conditions) {
	let navGraph = [];

	for (let i = 0; i<sourceGraph.length; i++) {
		if (conditions(i, sourceGraph)) {
			let nodePos = indexToColRow(i, BRICK_COLS, BRICK_COLS),
				node = new graphNode(nodePos.x, nodePos.y);
			
			navGraph.push(node);
		}
	}

	return navGraph;
}

function drawNavGraph(graph, color) {
	for (let i of graph) {
		if (i == undefined || i == null) {
			continue;
		}
		colorCircle(BRICK_W/2 + i.x * BRICK_W, BRICK_H/2 + i.y * BRICK_H, 4, color);
		for (let n of i.neighbors) {
			if (graph[n] == undefined || graph[n] == null) {
				continue;
			}
		}
	}
}

function playerLegalMove(index, graph) {
	if (isPassableTile(graph[index]) && isSolidTile(graph[index + BRICK_COLS])) {
		return true;
	} else {
		return false;
	}
}

function isPassableTile(value) {
	return 	value === EMPTY_TILE ||
			value === LADDER_TILE ||
			value === LADDER_BROKEN_TILE;
}

function isSolidTile(value) {
	return 	value === WALL_TILE ||
			value === LADDER_PLATFORM_TILE ||
			value === PLATFORM_TILE
}

function indexToColRow(index, width, height) {
	let col = index % width,
		row = Math.floor(index / height);

	return { x: col, y: row };
}

function graphNode(x, y) {
	this.x = x;
	this.y = y;

	this.neighbors = []
}