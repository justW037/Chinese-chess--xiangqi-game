const generalMoves = (
  piece: ChessPiece,
  isOccupied: (x: number, y: number) => boolean,
  isEnemyOccupied: (x: number, y: number) => boolean,
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y, isRed } = piece
  const generalYRange = isRed ? [7, 9] : [0, 2]

  const potentialMoves = [
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x + 1, y },
    { x: x - 1, y }
  ]

  potentialMoves.forEach(move => {
    if (
      move.x >= 3 &&
      move.x <= 5 &&
      move.y >= generalYRange[0] &&
      move.y <= generalYRange[1] &&
      (!isOccupied(move.x, move.y) || isEnemyOccupied(move.x, move.y))
    ) {
      moves.push(move)
    }
  })

  return moves
}

export default generalMoves
