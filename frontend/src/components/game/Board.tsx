import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeContext'
import { useEffect, useRef, useState } from 'react'
import drawBoard from '../../utils/drawBoard'

import getPieceSymbol from '../../utils/getPieceSymbol'
import { blackChessPieces, redChessPieces } from '../../utils/chessPieces'

import Moves from './Moves'
import PreviousPosition from './PreviousPosition'
import getValidMoves from '../../utils/moves/getValidMoves'
import { MessageType } from '../../enums/MessageType'
import checkGameOver from '../../utils/moves/checkGameOver'
import ConfettiExplosion from 'react-confetti-explosion'
import Chess from './Chess'
import useMatchStore from '../../zustand/matchStore'
import generateMoveNotation from '../../utils/generateMoveNotation'
import { LanguageNotation } from '../../enums/MoveNotation'
import useDrawBoard from '../../hooks/useDrawBoard'
import useEnemyMove from '../../hooks/useEnemyMove'
import usePieceMove from '../../hooks/usePieceMove'
import useActivePieces from '../../hooks/useActivePieces'
import useTimer from '../../hooks/useTimer'

interface BoardProps {
  ws?: any
  userId?: number
}

const Board: React.FC<BoardProps> = ({ ws, userId }) => {
  const boardSize = 450
  const canvasRef = useDrawBoard({ boardSize })

  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
  const [validMoves, setValidMoves] = useState<{ x: number; y: number }[]>([])
  const [previousPosition, setPreviousPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [turn, setTurn] = useState<'red' | 'black'>('red')
  const [pieces, setPieces] = useState<ChessPiece[]>([
    ...redChessPieces,
    ...blackChessPieces
  ])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isRedWin, setIsRedWin] = useState<boolean | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const fetchPlayers = useMatchStore(state => state.fetchPlayers)
  const activePieces = useMatchStore(state => state.activePieces)
  const turns = useMatchStore(state => state.turns)

  const isLatestTurn = () => {
    if (!activePieces) return true

    const lastTurn = turns[turns.length - 1]
    if (!lastTurn) return true

    const lastPieces = lastTurn.black?.piecesState || lastTurn.red?.piecesState
    return JSON.stringify(activePieces) === JSON.stringify(lastPieces)
  }

  useEffect(() => {
    if (ws.isRed === false) {
      setIsFlipped(true)
    }
    if (ws.isStartMatch && userId) {
      fetchPlayers(userId, ws.isRed, 300)
    }
  }, [])
  

  useActivePieces(activePieces, turns, setPieces, setPreviousPosition, setSelectedPiece, setValidMoves)

  const { handlePieceClick, handleMoveClick } = usePieceMove( isLatestTurn, isGameOver, ws.isRed, turn, selectedPiece, setSelectedPiece, setValidMoves, pieces, setPreviousPosition, userId, setPieces, setIsGameOver, setIsRedWin, ws.sendMessage, setTurn)

  useEnemyMove(ws.moveMessage, turns, setPieces, setPreviousPosition, setIsRedWin, setIsGameOver, pieces, setTurn, turn)

  useTimer(isGameOver, turn, setIsGameOver, setIsRedWin)

  return (
    <>
      {isGameOver && ((ws.isRed === isRedWin) && <ConfettiExplosion width={2000} />)}
      <div className={`relative w-fit ${isFlipped && 'flipped'}`}>
        <canvas
          className={`border-board dark:bg-neutral-800 rounded-xl p-10 `}
          ref={canvasRef}
        ></canvas>
        {pieces.map((piece, index) => (
          <Chess
            isSelectedPiece={selectedPiece === piece}
            key={piece.id}
            boardSize={boardSize}
            piece={piece}
            onClick={() => handlePieceClick(piece)}
            isRedWin={isRedWin}
            isFlipped={isFlipped}
          />
        ))}
        {validMoves.map((move, index) => (
          <Moves
            key={'move' + index}
            move={move}
            boardSize={boardSize}
            onClick={() => handleMoveClick(move)}
            isEnemyPiece={pieces.some(p => p.x === move.x && p.y === move.y)}
          />
        ))}
        {previousPosition && (
          <PreviousPosition move={previousPosition} boardSize={boardSize} />
        )}
      </div>
    </>
  )
}
export default Board
