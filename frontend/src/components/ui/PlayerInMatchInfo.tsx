import { PieceType } from "../../utils/chessPieces"
import getPieceSymbol from "../../utils/getPieceSymbol"

interface GroupedPieces {
  [key: string]: number
}

interface PlayerInMatchInfoProps {
  player: Player
  capturedPieces?: {
    isRed: boolean
    pieces: PieceType[]
  }
}

const PlayerInMatchInfo: React.FC<PlayerInMatchInfoProps> = ({
  player,
  capturedPieces
}) => {
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`
  }

  console.log(player.remainingTime)

  const groupedPieces = capturedPieces?.pieces.reduce((acc: GroupedPieces, piece) => {
    acc[piece] = (acc[piece] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-1 py-2 px-4  min-h-20">
      <div className="flex flex-row items-center gap-2">
        <p className="dark:text-white font-semibold text-xl t">{player.name}</p>
        <p className="dark:text-white text-sm">({player.point})</p>
        <img
          src={getFlagUrl(player.country)}
          alt={`${player.country} flag`}
          className="w-4 h-3 object-cover"
          loading="lazy"
        />
        <p className="dark:text-white ml-auto">
          {formatTime(player.remainingTime)}
        </p>
      </div>

      {groupedPieces && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(groupedPieces).map(([pieceType, count]) => (
            <div key={pieceType} className="relative">
              <div 
                className={`chess-color w-6 h-6 flex items-center justify-center border-2 rounded-full
                  ${capturedPieces?.isRed ? 'border-red-700' : 'border-black'}`}
              >
                <span 
                  className={`text-sm ${
                    capturedPieces?.isRed ? 'text-red-700' : 'text-black'
                  }`}
                >
                  {getPieceSymbol(Number(pieceType), capturedPieces?.isRed || false)}
                </span>
              </div>
              {count > 1 && (
                <span className="absolute -bottom-1 -right-1 bg-gray-200 dark:bg-gray-700 
                  rounded-full w-3 h-3 flex items-center justify-center text-xs dark:text-white">
                  {count}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerInMatchInfo

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}