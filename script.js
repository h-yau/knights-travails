// Coords are in the format of [x, y]
const knightMoves = (startingCoord, endingCoord) => {
  try {
    for (const coord of startingCoord) {
      if (coord < 0 || coord > 7)
        throw new Error(
          `The position ${startingCoord} is outside of the chessboard!`
        );
    }

    for (const coord of endingCoord) {
      if (coord < 0 || coord > 7)
        throw new Error(
          `The position ${endingCoord} is outside of the chessboard!`
        );
    }
  } catch (error) {
    console.error('Input validation error:', error.message);
    return;
  }

  // if startingCoord == endingCoord
  if (
    startingCoord[0] == endingCoord[0] &&
    startingCoord[1] == endingCoord[1]
  ) {
    return [startingCoord];
  }

  const ans = [];

  // all legal moves a knight can do
  const possibleMoves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  // instantiate a hashmap that stores each move and its parent
  const chessMoves = {};

  // first move has no parent
  chessMoves[startingCoord] = null;

  // queue to store its possible moves
  const queue = [[startingCoord, null]];

  // helper functions
  const isOneMoveAway = (currentMove) => {
    return (
      (Math.abs(currentMove[0] - endingCoord[0]) == 2 &&
        Math.abs(currentMove[1] - endingCoord[1]) == 1) ||
      (Math.abs(currentMove[0] - endingCoord[0]) == 1 &&
        Math.abs(currentMove[1] - endingCoord[1]) == 2)
    );
  };

  const isLegal = (x, y) => {
    return !(x < 0 || y < 0 || x > 7 || y > 7);
  };

  //  main function
  while (queue.length > 0) {
    let [curr, parent] = queue.shift();

    // exit condition, if the endingCoord is only one move away
    if (isOneMoveAway(curr)) {
      while (chessMoves[parent]) {
        ans.unshift(parent);
        parent = chessMoves[parent];
        if (parent[0] == startingCoord[0] && parent[1] == startingCoord[1])
          break;
      }

      ans.unshift(startingCoord);
      ans.push(curr, endingCoord);
      return ans;
    }

    if (chessMoves[curr]) continue;

    // list all possible moves
    for (const move of possibleMoves) {
      let newX = curr[0] + move[0];
      let newY = curr[1] + move[1];

      if (isLegal(newX, newY)) {
        queue.push([[newX, newY], curr]);
      }
    }

    chessMoves[curr] = parent;
  }
};

console.log(knightMoves([0, 0], [7, 1]));
console.log(' ');
console.log(knightMoves([4, 4], [3, 3]));
