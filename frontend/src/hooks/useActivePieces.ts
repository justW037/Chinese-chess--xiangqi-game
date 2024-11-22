// hooks/useActivePieces.ts
import { useEffect } from 'react'
import { blackChessPieces, redChessPieces } from '../utils/chessPieces'


const useActivePieces = (
  activePieces: ChessPiece[] | null,
  turns: Turn[],
  setPieces: (pieces: ChessPiece[]) => void,
  setPreviousPosition: (position: {x: number, y: number} | null) => void,
  setSelectedPiece: (piece: ChessPiece | null) => void,
  setValidMoves: (moves: {x: number, y: number}[]) => void
) => {
  useEffect(() => {
    if (activePieces) {
      const currentTurn = turns.find(
        turn =>
          JSON.stringify(turn.red?.piecesState) === JSON.stringify(activePieces) ||
          JSON.stringify(turn.black?.piecesState) === JSON.stringify(activePieces)
      )

      if (currentTurn) {
        if (
          JSON.stringify(currentTurn.red?.piecesState) === JSON.stringify(activePieces) &&
          currentTurn.red
        ) {
          setPreviousPosition({
            x: currentTurn.red.from.x,
            y: currentTurn.red.from.y
          })
        } else if (
          JSON.stringify(currentTurn.black?.piecesState) === JSON.stringify(activePieces) &&
          currentTurn.black
        ) {
          setPreviousPosition({
            x: currentTurn.black.from.x,
            y: currentTurn.black.from.y
          })
        }
      }

      setPieces(activePieces)
      setSelectedPiece(null)
      setValidMoves([])
    } else {
      setPieces([...redChessPieces, ...blackChessPieces])
      setPreviousPosition(null)
    }
  }, [activePieces])
}

export default useActivePieces