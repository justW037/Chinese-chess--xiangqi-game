import getValidMoves from './getValidMoves'

const checkGameOver = (nextTurn: 'red' | 'black', pieces: ChessPiece[]) => {
  // Get pieces for next player
  const playerPieces = pieces.filter(p =>
    nextTurn === 'red' ? p.isRed : !p.isRed
  )

  // Check if any piece has valid moves
  for (const piece of playerPieces) {
    const validMoves = getValidMoves(piece, pieces)
    if (validMoves.length > 0) {
      return false // Game not over if any piece can move
    }
  }

  return true // Game over if no pieces can move
}
export default checkGameOver