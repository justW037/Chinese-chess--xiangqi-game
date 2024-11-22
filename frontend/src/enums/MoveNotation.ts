export enum LanguageNotation {
  VI = 'vi',
  EN = 'en',
  CN = 'cn',
  HK = 'hk'
}

export const moveTypeNotations: Record<LanguageNotation, MoveTypeNotation> = {
  [LanguageNotation.VI]: {
    advance: '.',      // Tấn
    retreat: '/',      // Thoái
    horizontal: '-'    // Bình
  },
  [LanguageNotation.EN]: {
    advance: '+',      // Advance
    retreat: '-',      // Retreat  
    horizontal: '='    // Horizontal
  },
  [LanguageNotation.CN]: {
    advance: '进',     // Jìn
    retreat: '退',     // Tuì
    horizontal: '平'   // Píng
  },
  [LanguageNotation.HK]: {
    advance: '進',     // Jìn
    retreat: '退',     // Tuì
    horizontal: '平'   // Píng
  }
}

export const pieceNotations: Record<LanguageNotation, PieceNotation> = {
  [LanguageNotation.VI]: {
    general: 'Tg',    // Tướng
    advisor: 'S',     // Sĩ
    elephant: 'T',    // Tượng
    chariot: 'X',     // Xe
    cannon: 'P',      // Pháo
    horse: 'M',       // Mã
    soldier: 'B'      // Binh
  },
  [LanguageNotation.EN]: {
    general: 'K',     // King/General
    advisor: 'A',     // Advisor
    elephant: 'E',    // Elephant
    chariot: 'R',     // Rook/Chariot
    cannon: 'C',      // Cannon
    horse: 'H',       // Horse
    soldier: 'P'      // Pawn/Soldier
  },
  [LanguageNotation.CN]: {
    general: '将',    // Jiàng
    advisor: '仕',    // Shì
    elephant: '象',   // Xiàng
    chariot: '车',    // Jū
    cannon: '炮',     // Pào
    horse: '马',      // Mǎ
    soldier: '兵'     // Bīng
  },
  [LanguageNotation.HK]: {
    general: '將',    // Jiàng
    advisor: '士',    // Shì
    elephant: '象',   // Xiàng
    chariot: '車',    // Jū
    cannon: '炮',     // Pào
    horse: '馬',      // Mǎ
    soldier: '兵'     // Bīng
  }
}