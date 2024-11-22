enum PieceType {
  GENERAL ,
  ADVISOR,
  ELEPHANT ,
  HORSE ,
  CHARIOT ,
  CANNON ,
  SOLDIER
}

function getPieceSymbol(pieceType: PieceType, isBlack: boolean): string {
  switch (pieceType) {
    case PieceType.GENERAL:
      return isBlack ? '帥' : '將'
    case PieceType.ADVISOR:
      return isBlack ? '仕' : '士'
    case PieceType.ELEPHANT:
      return isBlack ? '相' : '象'
    case PieceType.HORSE:
      return isBlack ? '傌' : '馬'
    case PieceType.CHARIOT:
      return isBlack ? '俥' : '車'
    case PieceType.CANNON:
      return isBlack ? '炮' : '砲'
    case PieceType.SOLDIER:
      return isBlack ? '兵' : '卒'
    default:
      return ''
  }
}

export default getPieceSymbol
