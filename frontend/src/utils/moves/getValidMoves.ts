import { PieceType } from '../chessPieces'
import advisorMoves from './advisorMoves'
import cannonMoves from './cannonMoves'
import chariotMoves from './chariotMoves'
import elephantMoves from './elephantMoves'
import generalMoves from './generalMoves'
import horseMoves from './horseMoves'
import isGeneralInCheck from './isGeneralInCheck'
import soldierMoves from './soldierMoves'

const getValidMoves = (
  piece: ChessPiece,
  allPieces: ChessPiece[],
  skipCheck: boolean = false
): { x: number; y: number }[] => {
  let moves: { x: number; y: number }[] = []
  const { pieceType, isRed } = piece

  const isOccupied = (posX: number, posY: number): boolean => {
    return allPieces.some(p => p.x === posX && p.y === posY)
  }

  const isEnemyOccupied = (posX: number, posY: number): boolean => {
    return allPieces.some(
      p => p.x === posX && p.y === posY && p.isRed !== isRed
    )
  }

  switch (pieceType) {
    case PieceType.GENERAL:
      moves.push(...generalMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.ADVISOR:
      moves.push(...advisorMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.ELEPHANT:
      moves.push(...elephantMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.HORSE:
      moves.push(...horseMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.CHARIOT:
      moves.push(...chariotMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.CANNON:
      moves.push(...cannonMoves(piece, isOccupied, isEnemyOccupied))
      break

    case PieceType.SOLDIER:
      moves.push(...soldierMoves(piece, isOccupied, isEnemyOccupied))
      break
  }

  // remove invalid moves
  moves = moves.filter(
    move => move.x >= 0 && move.x <= 8 && move.y >= 0 && move.y <= 9
  )

  // if skipCheck is true, return the moves without checking if the general is in check
  if (skipCheck) {
    return moves
  }

  // simulate each move and check if the general is in check
  const validMoves: { x: number; y: number }[] = []

  for (const move of moves) {
    const simulatedPieces = allPieces.map(p => ({ ...p }))

    const pieceIndex = simulatedPieces.findIndex(
      p =>
        p.x === piece.x &&
        p.y === piece.y &&
        p.pieceType === piece.pieceType &&
        p.isRed === piece.isRed
    )

    simulatedPieces[pieceIndex].x = move.x
    simulatedPieces[pieceIndex].y = move.y
    const targetIndex = simulatedPieces.findIndex(
      p => p.x === move.x && p.y === move.y && p.isRed !== isRed
    )
    if (targetIndex !== -1) {
      simulatedPieces.splice(targetIndex, 1)
    }

    // check if the general will be in check after the move
    if (!isGeneralInCheck(simulatedPieces, isRed)) {
      validMoves.push(move)
    }
  }

  return validMoves
}

export default getValidMoves
