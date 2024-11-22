interface PreviousPositionProps {
  move: { x: number; y: number }
  boardSize: number
}

const PreviousPosition: React.FC<PreviousPositionProps> = ({
  move,
  boardSize
}) => {
  const cellSize = boardSize / 8
  const style: React.CSSProperties = {
    left: `${move.x * cellSize + 40}px`,
    top: `${move.y * cellSize + 40}px`,
    transform: 'translate(-50%, -50%)'
  }
  return (
    <div
      className="absolute h-6 w-6 bg-yellow-600 rounded-full z-10"
      style={style}
    ></div>
  )
}
export default PreviousPosition
