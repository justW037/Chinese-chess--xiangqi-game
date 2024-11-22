import { PieceType } from '../chessPieces'
import getValidMoves from './getValidMoves'

const isGeneralInCheck = (allPieces: ChessPiece[], isRed: boolean): boolean => {
  const friendlyGeneral = allPieces.find(
    p => p.pieceType === PieceType.GENERAL && p.isRed === isRed
  )

  const enemyGeneral = allPieces.find(
    p => p.pieceType === PieceType.GENERAL && p.isRed !== isRed
  )

  if (!friendlyGeneral || !enemyGeneral) return false

  // check if both generals are facing each other
  if (friendlyGeneral.x === enemyGeneral.x) {
    const minY = Math.min(friendlyGeneral.y, enemyGeneral.y)
    const maxY = Math.max(friendlyGeneral.y, enemyGeneral.y)
    const piecesBetween = allPieces.some(
      p =>
        p.x === friendlyGeneral.x &&
        p.y > minY &&
        p.y < maxY &&
        p.pieceType !== PieceType.GENERAL
    )
    if (!piecesBetween) {
      // both generals are facing each other
      return true
    }
  }

  const enemyPieces = allPieces.filter(p => p.isRed !== isRed)

  for (const enemyPiece of enemyPieces) {
    const moves = getValidMoves(enemyPiece, allPieces, true) // skipCheck = true to avoid infinite loop
    if (
      moves.some(
        move => move.x === friendlyGeneral.x && move.y === friendlyGeneral.y
      )
    ) {
      return true
    }
  }

  return false
}

export default isGeneralInCheck
