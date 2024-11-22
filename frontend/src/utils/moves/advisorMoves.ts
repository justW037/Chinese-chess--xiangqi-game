const advisorMoves = (
  piece: ChessPiece,
  isOccupied: (x: number, y: number) => boolean,
  isEnemyOccupied: (x: number, y: number) => boolean
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y, isRed } = piece
  const advisorYRange = isRed ? [7, 9] : [0, 2]

  const potentialMoves = [
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y - 1 }
  ]

  potentialMoves.forEach(move => {
    if (
      move.x >= 3 &&
      move.x <= 5 &&
      move.y >= advisorYRange[0] &&
      move.y <= advisorYRange[1] &&
      (!isOccupied(move.x, move.y) || isEnemyOccupied(move.x, move.y))
    ) {
      moves.push(move)
    }
  })

  return moves
}

export default advisorMoves
