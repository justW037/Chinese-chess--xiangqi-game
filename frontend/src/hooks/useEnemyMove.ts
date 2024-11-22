import { useEffect } from 'react'
import generateMoveNotation from '../utils/generateMoveNotation'
import { LanguageNotation } from '../enums/MoveNotation'
import useMatchStore from '../zustand/matchStore'
import checkGameOver from '../utils/moves/checkGameOver'

const useEnemyMove = (
  moveMessage: MovePieces | null,
  turns: Turn[],
  setPieces: (pieces: ChessPiece[]) => void,
  setPreviousPosition: (pos: {x: number, y: number} | null) => void,
  setIsRedWin: (isWin: boolean) => void,
  setIsGameOver: (isOver: boolean) => void,
  pieces: ChessPiece[],
  setTurn: (turn: 'red' | 'black') => void,
  turn: 'red' | 'black'
) => {
  const addMove = useMatchStore(state => state.addMove)
  const setActivePieces = useMatchStore(state => state.setActivePieces)
  useEffect(() => {
    if (moveMessage) {
      // Get latest pieces state from last turn or initial state
      const latestTurn = turns[turns.length - 1]
      const latestPieces: ChessPiece[] =
        latestTurn?.black?.piecesState || latestTurn?.red?.piecesState || pieces

      // Find the piece at start position
      const pieceToMove = latestPieces?.find(
        p => p.x === moveMessage.start_x && p.y === moveMessage.start_y
      )

      if (pieceToMove) {
        // Check if there's a piece to capture at target position
        const capturedPiece = latestPieces?.find(
          p => p.x === moveMessage.end_x && p.y === moveMessage.end_y
        )

        // Update pieces array
        const updatedPieces = latestPieces?.map(p => {
          if (p === pieceToMove) {
            return { ...p, x: moveMessage.end_x, y: moveMessage.end_y }
          }
          return p
        })

        // Remove captured piece if any
        const finalPieces = capturedPiece
          ? updatedPieces?.filter(p => p !== capturedPiece)
          : updatedPieces

        // Add opponent's move to match history
        const moveRecord: Move = {
          from: { x: moveMessage.start_x, y: moveMessage.start_y },
          to: { x: moveMessage.end_x, y: moveMessage.end_y },
          pieceType: pieceToMove.pieceType,
          captured: capturedPiece?.pieceType,
          notation: generateMoveNotation(
            pieceToMove,
            { x: moveMessage.start_x, y: moveMessage.start_y },
            { x: moveMessage.end_x, y: moveMessage.end_y },
            LanguageNotation.EN,
            latestPieces
          ),
          piecesState: finalPieces
        }

        addMove(moveRecord, pieceToMove.isRed)

        setTurn(turn === 'red' ? 'black' : 'red')
        setActivePieces(finalPieces)
        setPieces(finalPieces)
        setPreviousPosition({ x: pieceToMove.x, y: pieceToMove.y })

        const gameOver = checkGameOver(
          turn === 'red' ? 'black' : 'red',
          finalPieces
        )
        if (gameOver) {
          setIsRedWin(turn === 'red')
          setIsGameOver(true)
        }
      }
    }
  }, [moveMessage])
}

export default useEnemyMove
