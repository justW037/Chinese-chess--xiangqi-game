import { PieceType } from './chessPieces'
import { LanguageNotation, pieceNotations, moveTypeNotations } from '../enums/MoveNotation'

const chineseNumerals: Record<number, string> = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九'
}

function generateMoveNotation(
  piece: ChessPiece,
  from: { x: number; y: number },
  to: { x: number; y: number },
  language: LanguageNotation = LanguageNotation.EN,
  pieces?: ChessPiece[]
): string {
  const pieceNotation = pieceNotations[language][getPieceNotationKey(piece.pieceType)]
  
  // Get file number from player's perspective
  const getFileNumberNotation = (x: number, isRed: boolean, language: LanguageNotation): string => {
    const fileNumber = isRed ? 9 - x : x + 1
    return [LanguageNotation.CN, LanguageNotation.HK].includes(language) 
      ? chineseNumerals[fileNumber]
      : fileNumber.toString()
  }
  
  const getDistanceNotation = (distance: number, language: LanguageNotation): string => {
    return [LanguageNotation.CN, LanguageNotation.HK].includes(language) 
      ? chineseNumerals[distance]
      : distance.toString()
  }
  

  // Handle special case for soldiers
  if (piece.pieceType === PieceType.SOLDIER && pieces) {
    const soldiersInFile = pieces.filter(p => 
      p.pieceType === PieceType.SOLDIER && 
      p.isRed === piece.isRed && 
      p.x === from.x
    ).sort((a, b) => piece.isRed ? b.y - a.y : a.y - b.y)
    
    if (soldiersInFile.length > 2) {
      const soldierPosition = soldiersInFile.indexOf(piece) + 1
      return `${soldierPosition}${getFileNumberNotation(from.x, piece.isRed, language)}${
        getDirectionOperator({ ...from, isRed: piece.isRed }, to, language)}${
          getFileNumberNotation(to.x, piece.isRed, language)}`
    }
  }

  // Get movement direction
  const direction = getDirectionOperator(
    { ...from, isRed: piece.isRed }, 
    to, 
    language
  )

  // Handle duplicate pieces in same file
  const duplicatePieces = pieces?.filter(p => 
    p.pieceType === piece.pieceType && 
    p.isRed === piece.isRed && 
    p.x === from.x
  ) || []

  const fileIndicator = duplicatePieces.length > 1 
    ? piece.isRed ? '+' : '-'
    : getFileNumberNotation(from.x, piece.isRed, language)

  // For vertical movement, use number of ranks moved
  const destinationIndicator = direction === moveTypeNotations[language].horizontal 
  ? getFileNumberNotation(to.x, piece.isRed, language)
  : getDistanceNotation(Math.abs(to.y - from.y), language)


  return `${pieceNotation}${fileIndicator}${direction}${destinationIndicator}`
}

function getPieceNotationKey(pieceType: PieceType): keyof PieceNotation {
  switch (pieceType) {
    case PieceType.GENERAL: return 'general'
    case PieceType.ADVISOR: return 'advisor'
    case PieceType.ELEPHANT: return 'elephant'
    case PieceType.HORSE: return 'horse'
    case PieceType.CHARIOT: return 'chariot'
    case PieceType.CANNON: return 'cannon'
    case PieceType.SOLDIER: return 'soldier'
  }
}
function getDirectionOperator(
  from: { x: number; y: number; isRed: boolean }, 
  to: { x: number; y: number },
  language: LanguageNotation
): string {
  const { advance, retreat, horizontal } = moveTypeNotations[language]
  
  if (from.x === to.x) {
    return (from.y > to.y) === from.isRed ? advance : retreat
  }
  
  return horizontal
}

export default generateMoveNotation