interface MovesProps {
  move: { x: number; y: number }
  boardSize: number
  onClick: () => void
  isEnemyPiece: boolean
}

const Moves: React.FC<MovesProps> = ({ move, boardSize, onClick, isEnemyPiece: isEnemyPiece }) => {
  const cellSize = boardSize / 8
  const style: React.CSSProperties = {
    left: `${move.x * cellSize + 40}px`,
    top: `${move.y * cellSize + 40}px`,
    transform: 'translate(-50%, -50%)'
  }
  return (
    <div
      className={`absolute h-12 w-12 rounded-full z-20 ${isEnemyPiece && 'border-4 border-green-700'} `}
      style={style}
      onClick={onClick}
    >
      <div className={`${!isEnemyPiece && 'bg-green-700 '} rounded-full origin-center scale-50 w-full h-full`}></div>
    </div>
  )
}

export default Moves
