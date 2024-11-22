import { PieceType } from "../../utils/chessPieces"
import getPieceSymbol from "../../utils/getPieceSymbol"


interface ChessProps {
  boardSize: number
  piece: ChessPiece
  onClick: () => void
  isSelectedPiece: boolean,
  isRedWin: boolean | null,
  isFlipped: boolean
}

const Chess: React.FC<ChessProps> = ({
  boardSize,
  piece,
  onClick,
  isSelectedPiece,
  isRedWin,
  isFlipped
}) => {
  const cellSize = boardSize / 8
  const style: React.CSSProperties = {
    left: `${piece.x * cellSize + 40}px`,
    top: `${piece.y * cellSize + 40}px`,
    transform: 'translate(-50%, -50%)',
    lineHeight: '3rem',
    transition: 'all 0.3s ease' 
  }
  return (
    <div
      className={` absolute chess-color h-12 w-12 rounded-full text-center ${isRedWin !== null && piece.pieceType === PieceType.GENERAL && isRedWin !== piece.isRed && 'losing-general border-4 border-red-600'} ${
        isSelectedPiece ? 'border-4 border-yellow-600 ' : ' p-1 border-2 border-black' } `}
      style={style}
      onClick={onClick}
    >
      <span
        className={`text-2xl border-2 ${
          piece.isRed
            ? 'text-red-700 border-red-700'
            : 'text-black border-black '
        }  rounded-full w-full h-full flex items-center justify-center ${isFlipped && 'flipped'}`}
      >
        {getPieceSymbol(piece.pieceType, piece.isRed)}
      </span>
    </div>
  )
}

export default Chess
