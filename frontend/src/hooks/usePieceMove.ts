import { MessageType } from '../enums/MessageType'
import { LanguageNotation } from '../enums/MoveNotation'
import generateMoveNotation from '../utils/generateMoveNotation'
import checkGameOver from '../utils/moves/checkGameOver'
import getValidMoves from '../utils/moves/getValidMoves'
import useMatchStore from '../zustand/matchStore'

const usePieceMove = (
  isLatestTurn: () => boolean,
  isGameOver: boolean,
  isRed: boolean,
  turn: 'red' | 'black',
  selectedPiece: ChessPiece | null,
  setSelectedPiece: (piece: ChessPiece | null) => void,
  setValidMoves: (moves: { x: number; y: number }[]) => void,
  pieces: ChessPiece[],
  setPreviousPosition: (pos: { x: number; y: number } | null) => void,
  userId: number | undefined,
  setPieces: (pieces: ChessPiece[]) => void,
  setIsGameOver: (isOver: boolean) => void,
  setIsRedWin: (isWin: boolean) => void,
  sendMessage: (type: string, payload: any) => void,
  setTurn: (turn: 'red' | 'black') => void
) => {
  const addMove = useMatchStore(state => state.addMove)

  const handlePieceClick = (piece: ChessPiece) => {
    if (!isLatestTurn() || isGameOver) return

    if (
      piece.isRed === isRed &&
      ((turn === 'red' && isRed) || (turn === 'black' && !isRed))
    ) {
      setSelectedPiece(piece)
      setValidMoves(getValidMoves(piece, pieces))
    }
  }

  const handleMoveClick = (move: { x: number; y: number }) => {
    if (selectedPiece) {
      // previousPosition
      setPreviousPosition({ x: selectedPiece.x, y: selectedPiece.y })

      // Check if there's an enemy piece at the target position
      const targetPiece = pieces.find(
        p => p.x === move.x && p.y === move.y && p.isRed !== selectedPiece.isRed
      )

      // Update the piece's position
      const updatedPieces = pieces.map(p => {
        if (p === selectedPiece) {
          return { ...p, x: move.x, y: move.y } // Move selected piece
        }
        return p
      })

      if (sendMessage && userId) {
        const movePayload: MovePieces = {
          player_id: userId,
          start_x: selectedPiece.x,
          start_y: selectedPiece.y,
          end_x: move.x,
          end_y: move.y
        }
        sendMessage(MessageType.MOVE, movePayload)
      }

      // Remove the captured piece if any
      const finalPieces = targetPiece
        ? updatedPieces.filter(p => p !== targetPiece)
        : updatedPieces

      // Add move to match history
      const moveRecord: Move = {
        from: { x: selectedPiece.x, y: selectedPiece.y },
        to: { x: move.x, y: move.y },
        pieceType: selectedPiece.pieceType,
        captured: targetPiece?.pieceType,
        notation: generateMoveNotation(
          selectedPiece,
          { x: selectedPiece.x, y: selectedPiece.y },
          { x: move.x, y: move.y },
          LanguageNotation.EN,
          pieces
        ),
        piecesState: finalPieces
      }
      addMove(moveRecord, selectedPiece.isRed)
      setPieces(finalPieces)

      const gameOver = checkGameOver(
        turn === 'red' ? 'black' : 'red',
        updatedPieces
      )
      if (gameOver) {
        setIsGameOver(true)
        setIsRedWin(turn === 'red')
        if (userId) {
          sendMessage(MessageType.GAME_OVER, { winner_id: userId })
        }
      } else {
        setTurn(turn === 'red' ? 'black' : 'red')
      }
      setSelectedPiece(null)
      setValidMoves([])
    }
  }

    return { handlePieceClick, handleMoveClick }
}

export default usePieceMove
