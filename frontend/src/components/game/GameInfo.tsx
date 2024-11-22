import { IoChatboxSharp } from 'react-icons/io5'
import { IoMdMove } from 'react-icons/io'
import PlayerInMatchInfo from '../ui/PlayerInMatchInfo'
import { useEffect, useState } from 'react'
import { PieceType } from '../../utils/chessPieces'
import MovesState from './MovesState'
import InGameChat from './InGameChat'
import useUserStore from '../../zustand/userStore'
import useMatchStore from '../../zustand/matchStore'

interface GameInfoProps {
  ws?: any
  matchId: number | null
}

const GameInfo: React.FC<GameInfoProps> = ({ ws, matchId }) => {
  const [activeTab, setActiveTab] = useState<'moves' | 'chat'>('moves')
  const user = useUserStore(state => state.user)
  const players = useMatchStore(state => state.players)
  const turns = useMatchStore(state => state.turns)
  const getCapturedList = useMatchStore(state => state.getCapturedList)
  const resetTurns = useMatchStore(state => state.resetTurns)


  const capturedList = getCapturedList()

  const blackCapturedPieces = {
    isRed: true,
    pieces: capturedList.red
  }

  const redCapturedPieces = {
    isRed: false,
    pieces: capturedList.black
  }

  useEffect(() => {
    resetTurns()
  }, [matchId])

  return (
    <div
      className={`dark:bg-neutral-800 h-full w-1/3 flex flex-col border dark:border-white border-black rounded-lg game-info-color`}
    >
      <PlayerInMatchInfo
        player={user?.id === players.black.id ? players.red : players.black}
        capturedPieces={blackCapturedPieces}
      />
      <div className="flex flex-row justify-between border-t dark:border-t-white border-t-black">
        <div
          className={`flex flex-row flex-1 p-2 gap-3 place-content-center cursor-pointer
                ${
                  activeTab === 'moves'
                    ? 'border-b-4 border-b-black dark:border-b-white'
                    : 'border-b-4 border-transparent'
                }`}
          onClick={() => setActiveTab('moves')}
        >
          <IoMdMove className="dark:text-white place-self-center" />
          <p className="dark:text-white text-lg font-bold">Moves</p>
        </div>
        <div
          className={`flex flex-row flex-1 p-2 gap-3 place-content-center cursor-pointer
                ${
                  activeTab === 'chat'
                    ? 'border-b-4 border-b-black dark:border-b-white'
                    : 'border-b-4 border-transparent'
                }`}
          onClick={() => setActiveTab('chat')}
        >
          <IoChatboxSharp className="dark:text-white place-self-center" />
          <p className="dark:text-white text-lg font-bold">Chat</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto border-b border-b-black dark:border-b-white">
        {activeTab === 'moves' && <MovesState turns={turns} />}
        {activeTab === 'chat' && <InGameChat />}
      </div>
      <PlayerInMatchInfo
        player={user?.id === players.black.id ? players.black : players.red}
        capturedPieces={redCapturedPieces}
      />
    </div>
  )
}
export default GameInfo
