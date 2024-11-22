const soldierMoves = (
  piece: ChessPiece,
  isOccupied: (posX: number, posY: number) => boolean,
  isEnemyOccupied: (posX: number, posY: number) => boolean
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y, isRed } = piece

  // Move forward based on color
  if (isRed) {
    if (y > 0 && (!isOccupied(x, y - 1) || isEnemyOccupied(x, y - 1))) {
      moves.push({ x, y: y - 1 }) 
    }
    if (y <= 4) {
      // Can move sideways after crossing the river
      if (!isOccupied(x + 1, y) || isEnemyOccupied(x + 1, y))
        moves.push({ x: x + 1, y }) // Move right
      if (!isOccupied(x - 1, y) || isEnemyOccupied(x - 1, y))
        moves.push({ x: x - 1, y }) // Move left
    }
    // If on the opponent's end row, restrict to only sideways moves
    if (y === 0) {
      moves.splice(0, moves.length) // Clear forward move
      if (!isOccupied(x + 1, y) || isEnemyOccupied(x + 1, y))
        moves.push({ x: x + 1, y }) // Move right
      if (!isOccupied(x - 1, y) || isEnemyOccupied(x - 1, y))
        moves.push({ x: x - 1, y }) // Move left
    }
  } else {
    if (y < 9 && (!isOccupied(x, y + 1) || isEnemyOccupied(x, y + 1))) {
      moves.push({ x, y: y + 1 })
    }
    if (y >= 5) {
      // Can move sideways after crossing the river
      if (!isOccupied(x + 1, y) || isEnemyOccupied(x + 1, y))
        moves.push({ x: x + 1, y }) // Move right
      if (!isOccupied(x - 1, y) || isEnemyOccupied(x - 1, y))
        moves.push({ x: x - 1, y }) // Move left
    }
    // If on the opponent's end row, restrict to only sideways moves
    if (y === 9) {
      moves.splice(0, moves.length) // Clear forward move
      if (!isOccupied(x + 1, y) || isEnemyOccupied(x + 1, y))
        moves.push({ x: x + 1, y }) // Move right
      if (!isOccupied(x - 1, y) || isEnemyOccupied(x - 1, y))
        moves.push({ x: x - 1, y }) // Move left
    }
  }

  return moves
}

export default soldierMoves
