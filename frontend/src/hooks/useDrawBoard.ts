import { useEffect, useRef } from 'react'
import { useTheme } from '../components/ThemeContext'
import drawBoard from '../utils/drawBoard'

interface DrawBoardProps {
    boardSize: number,
}

const useDrawBoard = ({ boardSize }: DrawBoardProps) => {
  const { isDarkMode } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const strokeColor = isDarkMode ? '#FFE5C4' : '#000000'
  const backgroundBoardColor = isDarkMode ? '#262626' : '#FFE5C4'
  const lineWidth = 1

  useEffect(() => {
    drawBoard(
      canvasRef,
      strokeColor,
      boardSize,
      backgroundBoardColor,
      lineWidth
    )
  }, [isDarkMode])

    return canvasRef
}
export default useDrawBoard
