import axios from 'axios'
import { create } from 'zustand'
import useUserStore from './userStore'
import { PieceType } from '../utils/chessPieces'

const InitialState: MatchState = {
  matchId: null,
  turns: [],
  players: {
    red: {
      id: 0,
      name: '',
      country: '',
      point: 0,
      remainingTime: 0
    },
    black: {
      id: 0,
      name: '',
      country: '',
      point: 0,
      remainingTime: 0
    }
  },
  activePieces: null,
  addMove: () => {},
  undoLastMove: () => {},
  resetTurns: () => {},
  fetchPlayers: async () => {},
  getCapturedList: () => ({ red: [], black: [] }),
  setActivePieces: () => {},
  updateTime: () => {}
}
const useMatchStore = create<MatchState>(set => ({
  ...InitialState,
  addMove: (move: Move, isRed: boolean) =>
    set(state => {
      const turns = [...state.turns]
      const currentTurn = turns[turns.length - 1]

      if (!currentTurn || (currentTurn.red && currentTurn.black)) {
        // Start new turn
        turns.push({
          turnId: turns.length + 1,
          [isRed ? 'red' : 'black']: move
        })
      } else {
        // Add to current turn
        currentTurn[isRed ? 'red' : 'black'] = move
      }

      return { turns }
    }),
  undoLastMove: () =>
    set(state => {
      const turns = [...state.turns]
      const lastTurn = turns[turns.length - 1]

      if (lastTurn) {
        if (lastTurn.black) {
          lastTurn.black = undefined
        } else if (lastTurn.red) {
          turns.pop()
        }
      }

      return { turns }
    }),
  resetTurns: () => set(state => ({ ...state, turns: [], activePieces: null })),
  fetchPlayers: async (
    userId: number,
    isRed: boolean,
    remainingTime: number
  ) => {
    const { token, tokenType } = useUserStore.getState()
    try {
      const response = await axios.get<PlayersResponse>(
        process.env.REACT_APP_API_URL + `/games/players`,
        {
          headers: { Authorization: `${tokenType} ${token}` }
        }
      )
      if (!response.data) {
        throw new Error('No players data received')
      }
      // Set players based on userId and isRed
      const { game_id, player_1, player_2 } = response.data

      set(state => ({ matchId: game_id }))

      if (player_1.id === userId) {
        set(state => ({
          players: {
            red: isRed
              ? { ...player_1, remainingTime }
              : { ...player_2, remainingTime },
            black: isRed
              ? { ...player_2, remainingTime }
              : { ...player_1, remainingTime }
          }
        }))
      } else if (player_2.id === userId) {
        set(state => ({
          players: {
            red: isRed
              ? { ...player_2, remainingTime }
              : { ...player_1, remainingTime },
            black: isRed
              ? { ...player_1, remainingTime }
              : { ...player_2, remainingTime }
          }
        }))
      }
    } catch (error) {
      console.error('Fetch players error:', error)
    }
  },
  getCapturedList: () => {
    const { turns } = useMatchStore.getState()
    const capturedList: { red: PieceType[]; black: PieceType[] } = {
      red: [],
      black: []
    }

    turns.forEach(turn => {
      if (turn.red?.captured) {
        capturedList.black.push(turn.red.captured)
      }
      if (turn.black?.captured) {
        capturedList.red.push(turn.black.captured)
      }
    })

    return capturedList
  },
  setActivePieces: (pieces: ChessPiece[] | null) => set({ activePieces: pieces }),
  updateTime: (turn: string, time: number) =>
    set(state => ({
      players: {
        ...state.players,
        [turn]: {
          ...state.players[turn as keyof typeof state.players],
          remainingTime: time
        }
      }
    }))
}))

export default useMatchStore
