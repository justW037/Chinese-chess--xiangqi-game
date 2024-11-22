import { useEffect } from "react"
import useMatchStore from "../zustand/matchStore"

const useTimer = (
    isGameOver: boolean,
    turn: 'red' | 'black',
    setIsGameOver: (isOver: boolean) => void,
    setIsRedWin: (isWin: boolean) => void,
  ) => {
    const players = useMatchStore(state => state.players)
    const updateTime = useMatchStore(state => state.updateTime)
  
    useEffect(() => {
      let timer: NodeJS.Timer | null = null
  
      if (!isGameOver) {
        timer = setInterval(() => {
          if (turn === 'red') {
            if (players.red.remainingTime <= 0) {
              setIsGameOver(true)
              setIsRedWin(false)
              clearInterval(timer as NodeJS.Timer)
            } else {
              updateTime(turn, players.red.remainingTime - 1)
            }
          } else {
            if (players.black.remainingTime <= 0) {
              setIsGameOver(true) 
              setIsRedWin(true)
              clearInterval(timer as NodeJS.Timer)
            } else {
              updateTime(turn, players.black.remainingTime - 1)
            }
          }
        }, 1000)
      }
  
      return () => {
        if (timer) clearInterval(timer)
      }
    },  [turn, isGameOver, players, updateTime, setIsGameOver, setIsRedWin])
  }
  
  export default useTimer