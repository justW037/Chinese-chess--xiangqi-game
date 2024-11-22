const chariotMoves = (
  piece: ChessPiece,
  isOccupied: (posX: number, posY: number) => boolean,
  isEnemyOccupied: (posX: number, posY: number) => boolean
): { x: number; y: number }[] => {
  const moves: { x: number; y: number }[] = []
  const { x, y } = piece

  // Function to check moves in a specified direction
  const checkDirection = (deltaX: number, deltaY: number) => {
    let i = x + deltaX
    let j = y + deltaY

    while (i >= 0 && i <= 8 && j >= 0 && j <= 9) {
      if (isOccupied(i, j)) {
        if (isEnemyOccupied(i, j)) moves.push({ x: i, y: j })
        break
      }
      moves.push({ x: i, y: j })
      i += deltaX
      j += deltaY
    }
  }

  checkDirection(1, 0) // Right
  checkDirection(-1, 0) // Left
  checkDirection(0, 1) // Down
  checkDirection(0, -1) // Up

  return moves
}

export default chariotMoves
