import { Link } from 'react-router-dom'
import { useTheme } from '../../../components/ThemeContext'
import Board from '../../../components/game/Board'
import MenuMode from '../../../components/ui/MenuMode'
import SearchingMatch from '../../../components/ui/SearchingMatch'
import { useCallback, useEffect, useState } from 'react'
import useWebsocket from '../../../hooks/useWebsocket'
import useUserStore from '../../../zustand/userStore'
import PlayerInMatchInfo from '../../../components/ui/PlayerInMatchInfo'
import { PieceType } from '../../../utils/chessPieces'
import GameInfo from '../../../components/game/GameInfo'
import useMatchStore from '../../../zustand/matchStore'


function Play() {
  const matchId = useMatchStore(state => state.matchId)
  const ws = useWebsocket(process.env.REACT_APP_WEB_SOCKET_URL)
  
  const user = useUserStore(state => state.user)

  const onSearchMatch = useCallback(() => {
    ws.connect()
  }, [ws])

  const onCancelSearch = useCallback(() => {
    ws.disconnect()
  }, [ws])


  
  return (
    <div className="relative h-full">
      {!ws.isSearching && !ws.isStartMatch && (
        <MenuMode onSearchMatch={onSearchMatch} />
      )}
      {ws.isSearching && <SearchingMatch onCancelSearch={onCancelSearch} />}
      {ws.isStartMatch && (
        <div className="flex flex-row gap-20 h-full items-center">
        <Board userId={user?.id} ws={ws} />
        <GameInfo matchId={matchId}/>
      </div>
      )}
     
    </div>
  )
}

export default Play
