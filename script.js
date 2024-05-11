// Coords are in the format of [x, y]
const knightMoves = (startingCoord, endingCoord) => {
  // if startingCoord == endingCoord
  if (startingCoord == endingCoord) {
    return [startingCoord];
  }

  const ans = [];

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

  const chessMoves = {};
  chessMoves[startingCoord] = null;

  const queue = [[startingCoord, null]];

  while (queue.length > 0) {
    let [curr, parent] = queue.shift();

    // exit condition, if the endingCoord is only one move away
    if (
      (Math.abs(curr[0] - endingCoord[0]) == 2 &&
        Math.abs(curr[1] - endingCoord[1]) == 1) ||
      (Math.abs(curr[0] - endingCoord[0]) == 1 &&
        Math.abs(curr[1] - endingCoord[1]) == 2)
    ) {
      while (chessMoves[parent] != null) {
        ans.unshift(parent);
        const [cur, newParent] = chessMoves[parent];
        parent = newParent;
      }

      // logic is still wrong
      ans.unshift(startingCoord);
      ans.push(curr, endingCoord);
      return ans;
    }

    if (chessMoves[curr]) continue;

    // list all possible moves

    for (const move of possibleMoves) {
      let newX = curr[0] + move[0];
      let newY = curr[1] + move[1];

      if (newX < 0 || newY < 0) continue;
      if (newX > 7 || newY > 7) continue;

      queue.push([[newX, newY], curr]);
    }

    chessMoves[curr] = parent;
  }
};

console.log(knightMoves([0, 0], [1, 0]));
console.log(' ');
console.log(knightMoves([4, 4], [3, 3]));

// const forward = (coord) => {
//   let count = 0;
//   while (count < 15) {
//     console.log(coord);

//     // to randomize moves
//     const coordXHasMoreSteps = Math.random() > 0.5;

//     // if true, positive. If false, negative
//     const xDirection = Math.random() > 0.5;
//     const yDirection = Math.random() > 0.5;

//     if (coordXHasMoreSteps) {
//       if (xDirection) {
//         coord[0] += 2;
//       } else {
//         coord[0] -= 2;
//       }

//       if (yDirection) {
//         coord[1] += 1;
//       } else {
//         coord[1] -= 1;
//       }

//       // fine tuning
//       if (coord[0] > 7) {
//         coord[0] -= 4;
//       } else if (coord[0] < 0) {
//         coord[0] += 4;
//       }

//       if (coord[1] > 7) {
//         coord[1] -= 2;
//       } else if (coord[1] < 0) {
//         coord[1] += 2;
//       }
//     } else {
//       if (xDirection) {
//         coord[0] += 1;
//       } else {
//         coord[0] -= 1;
//       }

//       if (yDirection) {
//         coord[1] += 2;
//       } else {
//         coord[1] -= 2;
//       }

//       // fine tuning
//       if (coord[0] > 7) {
//         coord[0] -= 2;
//       } else if (coord[0] < 0) {
//         coord[0] += 2;
//       }

//       if (coord[1] > 7) {
//         coord[1] -= 4;
//       } else if (coord[1] < 0) {
//         coord[1] += 4;
//       }
//     }

//     count++;
//   }
// };

// forward([0, 0]);
