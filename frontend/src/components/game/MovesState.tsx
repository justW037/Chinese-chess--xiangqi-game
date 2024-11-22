import useMatchStore from "../../zustand/matchStore"

interface MovesStateProps {
  turns: Turn[]
}

const MovesState: React.FC<MovesStateProps> = ({ turns }) => {
  const setActivePieces = useMatchStore(state => state.setActivePieces)

  const handleMoveClick = (turn: Turn, isRed: boolean) => {
    if (isRed && turn.red) {
      setActivePieces(turn.red.piecesState)
    } else if (!isRed && turn.black) {
      setActivePieces(turn.black.piecesState)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      {turns.map((turn, index) => (
        <div key={turn.turnId} className={`flex flex-row w-full px-3 gap-4 py-1 ${index % 2 !== 0 ? 'dark:bg-neutral-700 game-info-color-dark' : ''   }`}>
          <p className="dark:text-white text-lg text-start flex-1">{turn.turnId}</p>
          <p className="dark:text-white text-lg text-start flex-1" onClick={() => handleMoveClick(turn, true)}>{turn.red?.notation}</p>
          <p className="dark:text-white text-lg text-start flex-1" onClick={() => handleMoveClick(turn, false)}>{turn.black?.notation}</p>
        </div>
      ))}
      
    </div>
  )
}
export default MovesState
