const drawBoard = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  strokeColor: string,
  boardSize: number,
  backgroundBoardColor: string,
  lineWidth: number
) => {
  const cellSize = boardSize / 8
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  canvas.width = boardSize
  canvas.height = boardSize + cellSize

  context.fillStyle = backgroundBoardColor
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.strokeStyle = strokeColor
  context.lineWidth = lineWidth

  // draw y lines
  for (let i = 0; i <= 9; i++) {
    const y = i * cellSize
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(boardSize, y)
    context.stroke()
  }

  // draw x lines
  for (let i = 0; i <= 8; i++) {
    const x = i * cellSize
    context.beginPath()
    context.moveTo(x, 0)
    if (i === 0 || i === 8) {
      context.lineTo(x, canvas.height)
    } else {
      context.lineTo(x, cellSize * 4)
      context.stroke()
      context.beginPath()
      context.moveTo(x, cellSize * 5)
      context.lineTo(x, canvas.height)
    }
    context.stroke()
  }

  const drawCrossLines = (x: number, y: number): void => {
    context.strokeStyle = strokeColor
    context.lineWidth = lineWidth
    const centerX = cellSize * x
    const centerY = cellSize * y

    context.beginPath()
    context.moveTo(centerX - cellSize, centerY - cellSize)
    context.lineTo(centerX + cellSize, centerY + cellSize)
    context.stroke()

    context.beginPath()
    context.moveTo(centerX + cellSize, centerY - cellSize)
    context.lineTo(centerX - cellSize, centerY + cellSize)
    context.stroke()
  }

  drawCrossLines(4, 8)
  drawCrossLines(4, 1)

  const drawLShape = (x: number, y: number) => {
    const offset = cellSize / 10
    const size = cellSize / 8
    const centerX = cellSize * x
    const centerY = cellSize * y

    context.strokeStyle = strokeColor
    context.lineWidth = lineWidth

    //top left
    context.beginPath()
    context.moveTo(centerX - offset - size, centerY - offset)
    context.lineTo(centerX - offset, centerY - offset)
    context.stroke()

    context.beginPath()
    context.moveTo(centerX - offset, centerY - offset)
    context.lineTo(centerX - offset, centerY - offset - size)
    context.stroke()

    //top right
    context.beginPath()
    context.moveTo(centerX + offset, centerY - offset)
    context.lineTo(centerX + offset + size, centerY - offset)
    context.stroke()

    context.beginPath()
    context.moveTo(centerX + offset, centerY - offset)
    context.lineTo(centerX + offset, centerY - offset - size)
    context.stroke()

    //bottom left
    context.beginPath()
    context.moveTo(centerX - offset - size, centerY + offset)
    context.lineTo(centerX - offset, centerY + offset)
    context.stroke()

    context.beginPath()
    context.moveTo(centerX - offset, centerY + offset)
    context.lineTo(centerX - offset, centerY + offset + size)
    context.stroke()

    //bottom right
    context.beginPath()
    context.moveTo(centerX + offset, centerY + offset)
    context.lineTo(centerX + offset + size, centerY + offset)
    context.stroke()

    context.beginPath()
    context.moveTo(centerX + offset, centerY + offset)
    context.lineTo(centerX + offset, centerY + offset + size)
    context.stroke()
  }

  const coordinates = [
    [1, 2],
    [7, 2],
    [1, 7],
    [7, 7],
    [0, 3],
    [2, 3],
    [4, 3],
    [6, 3],
    [8, 3],
    [0, 6],
    [2, 6],
    [4, 6],
    [6, 6],
    [8, 6]
  ]

  coordinates.forEach(([x, y]) => {
    drawLShape(x, y)
  })

  const borderCoords = [
    [0, 0, 0, canvas.height], // Left border
    [boardSize, 0, boardSize, canvas.height], // Right border
    [0, 0, boardSize, 0], // Top border
    [0, canvas.height, boardSize, canvas.height] // Bottom border
  ]
  context.lineWidth = lineWidth * 2
  borderCoords.forEach(([x1, y1, x2, y2]) => {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
  })
}
export default drawBoard
