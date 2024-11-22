const horseMoves = (
  piece: ChessPiece,
  isOccupied: (x: number, y: number) => boolean,
  isEnemyOccupied: (x: number, y: number) => boolean
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y } = piece

  const potentialMoves = [
    { x: x + 2, y: y + 1, legX: x + 1, legY: y },
    { x: x + 2, y: y - 1, legX: x + 1, legY: y },
    { x: x - 2, y: y + 1, legX: x - 1, legY: y },
    { x: x - 2, y: y - 1, legX: x - 1, legY: y },
    { x: x + 1, y: y + 2, legX: x, legY: y + 1 },
    { x: x + 1, y: y - 2, legX: x, legY: y - 1 },
    { x: x - 1, y: y + 2, legX: x, legY: y + 1 },
    { x: x - 1, y: y - 2, legX: x, legY: y - 1 }
  ]

  potentialMoves.forEach(move => {
    if (
      move.x >= 0 &&
      move.x <= 8 &&
      move.y >= 0 &&
      move.y <= 9 &&
      !isOccupied(move.legX, move.legY) && // Check if leg is not blocked
      (!isOccupied(move.x, move.y) || isEnemyOccupied(move.x, move.y))
    ) {
      moves.push({ x: move.x, y: move.y })
    }
  })

  return moves
}

export default horseMoves
