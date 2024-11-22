interface Move {
  from: {
    x: number
    y: number
  }
  to: {
    x: number
    y: number
  }
  pieceType: PieceType
  captured?: PieceType
  notation: string
  piecesState: Piece[]
}

interface Turn {
  red?: Move
  black?: Move
  turnId: number
}

interface PlayersResponse {
  game_id: number
  player_1: Player
  player_2: Player
}

interface MatchState {
  matchId: number | null
  turns: Turn[]
  players: { red: Player, black: Player}
  activePieces: ChessPiece[] | null
  addMove: (move: Move, isRed: boolean) => void
  undoLastMove: () => void
  resetTurns: () => void
  fetchPlayers: (userId: number, isRed: boolean, remainingTime: number) => void
  getCapturedList: () => { red: PieceType[], black: PieceType[] }
  setActivePieces: (pieces: ChessPiece[] | null) => void
  updateTime: (turn: 'red' | 'black', time: number) => void
}
