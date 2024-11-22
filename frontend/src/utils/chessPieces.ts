export enum PieceType {
  GENERAL,
  ADVISOR,
  ELEPHANT,
  HORSE,
  CHARIOT,
  CANNON,
  SOLDIER
}

export const redChessPieces: ChessPiece[] = [
  {id: 'red-general', pieceType: PieceType.GENERAL, x: 4, y: 9, isRed: true },
  {id: 'red-chariot-1', pieceType: PieceType.CHARIOT, x: 0, y: 9, isRed: true },
  {id: 'red-chariot-2', pieceType: PieceType.CHARIOT, x: 8, y: 9, isRed: true },
  {id: 'red-horse-1', pieceType: PieceType.HORSE, x: 1, y: 9, isRed: true },
  {id: 'red-horse-2', pieceType: PieceType.HORSE, x: 7, y: 9, isRed: true },
  {id: 'red-elephant-1', pieceType: PieceType.ELEPHANT, x: 2, y: 9, isRed: true },
  {id: 'red-elephant-2', pieceType: PieceType.ELEPHANT, x: 6, y: 9, isRed: true },
  {id: 'red-advisor-1', pieceType: PieceType.ADVISOR, x: 3, y: 9, isRed: true },
  {id: 'red-advisor-2', pieceType: PieceType.ADVISOR, x: 5, y: 9, isRed: true },
  {id: 'red-cannon-1', pieceType: PieceType.CANNON, x: 1, y: 7, isRed: true },
  {id: 'red-cannon-2', pieceType: PieceType.CANNON, x: 7, y: 7, isRed: true },
  {id: 'red-soldier-1', pieceType: PieceType.SOLDIER, x: 0, y: 6, isRed: true },
  {id: 'red-soldier-2',  pieceType: PieceType.SOLDIER, x: 2, y: 6, isRed: true },
  {id: 'red-soldier-3',  pieceType: PieceType.SOLDIER, x: 4, y: 6, isRed: true },
  {id: 'red-soldier-4',  pieceType: PieceType.SOLDIER, x: 6, y: 6, isRed: true },
  {id: 'red-soldier-5',  pieceType: PieceType.SOLDIER, x: 8, y: 6, isRed: true }
]

export const blackChessPieces: ChessPiece[] = [
  {id: 'black-general', pieceType: PieceType.GENERAL, x: 4, y: 0, isRed: false },
  {id: 'black-chariot-1', pieceType: PieceType.CHARIOT, x: 0, y: 0, isRed: false },
  {id: 'black-chariot-2', pieceType: PieceType.CHARIOT, x: 8, y: 0, isRed: false },
  {id: 'black-horse-1', pieceType: PieceType.HORSE, x: 1, y: 0, isRed: false },
  {id: 'black-horse-2', pieceType: PieceType.HORSE, x: 7, y: 0, isRed: false },
  {id: 'black-elephant-1', pieceType: PieceType.ELEPHANT, x: 2, y: 0, isRed: false },
  {id: 'black-elephant-2', pieceType: PieceType.ELEPHANT, x: 6, y: 0, isRed: false },
  {id: 'black-advisor-1', pieceType: PieceType.ADVISOR, x: 3, y: 0, isRed: false },
  {id: 'black-advisor-2', pieceType: PieceType.ADVISOR, x: 5, y: 0, isRed: false },
  {id: 'black-cannon-1', pieceType: PieceType.CANNON, x: 1, y: 2, isRed: false },
  {id: 'black-cannon-2', pieceType: PieceType.CANNON, x: 7, y: 2, isRed: false },
  {id: 'black-soldier-1', pieceType: PieceType.SOLDIER, x: 0, y: 3, isRed: false },
  {id: 'black-soldier-2', pieceType: PieceType.SOLDIER, x: 2, y: 3, isRed: false },
  {id: 'black-soldier-3', pieceType: PieceType.SOLDIER, x: 4, y: 3, isRed: false },
  {id: 'black-soldier-4', pieceType: PieceType.SOLDIER, x: 6, y: 3, isRed: false },
  {id: 'black-soldier-5', pieceType: PieceType.SOLDIER, x: 8, y: 3, isRed: false },
]