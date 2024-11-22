const elephantMoves = (
  piece: ChessPiece,
  isOccupied: (x: number, y: number) => boolean,
  isEnemyOccupied: (x: number, y: number) => boolean
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y, isRed } = piece
  const elephantYRange = isRed ? [5, 9] : [0, 4]

  const potentialMoves = [
    { x: x + 2, y: y + 2 },
    { x: x - 2, y: y + 2 },
    { x: x + 2, y: y - 2 },
    { x: x - 2, y: y - 2 }
  ]

  potentialMoves.forEach(move => {
    const midX = (x + move.x) / 2
    const midY = (y + move.y) / 2

    if (
      move.x >= 0 &&
      move.x <= 8 &&
      move.y >= elephantYRange[0] &&
      move.y <= elephantYRange[1] &&
      !isOccupied(midX, midY) &&
      (!isOccupied(move.x, move.y) || isEnemyOccupied(move.x, move.y))
    ) {
      moves.push(move)
    }
  })

  return moves
}

export default elephantMoves
