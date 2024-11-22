import { useRef, useState, useEffect, useCallback } from 'react'
import userStore from '../zustand/userStore'
import { MessageType } from '../enums/MessageType'

const RECONNECT_DELAY = 5000

const useWebsocket = (url: string | undefined) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isStartMatch, setIsStartMatch] = useState(false)
  const [isRed, setIsRed] = useState(false)
  const [moveMessage, setMoveMessage] = useState<MovePieces | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const token = userStore(state => state.token)

  const connect = useCallback(() => {
    if (!token || !url) return

    setIsSearching(true)

    if (wsRef.current) {
      wsRef.current.close()
    }

    const ws = new WebSocket(`${url}?token=${token}`)

    ws.onopen = () => {
      console.log('WebSocket Connected')
      setIsConnected(true)
    }

    ws.onclose = () => {
      console.log('WebSocket Disconnected')
      setIsConnected(false)
      wsRef.current = null

      // Only auto-reconnect if still searching
      if (isSearching) {
        console.log(`Reconnecting in ${RECONNECT_DELAY / 1000} seconds...`)
        reconnectTimeoutRef.current = setTimeout(() => {
          connect()
        }, RECONNECT_DELAY)
      }
    }

    ws.onerror = error => {
      console.error('WebSocket Error:', error)
    }

    ws.onmessage = event => {
      try {
        if (event.data.startsWith('Match started!')) {
          setIsSearching(false)
          setIsStartMatch(true)
          const side = event.data.split(':')[1].trim() // Get "RED" or "BLACK"
          setIsRed(side === 'RED')
          return
        }
        const message = JSON.parse(event.data)

        if (message.type === MessageType.MOVE) {

          setMoveMessage(message.payload)

        }
    
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    wsRef.current = ws
  }, [token, url])

  const disconnect = useCallback(() => {
    setIsSearching(false)

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    setIsConnected(false)
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  const sendMessage = (type: string, payload: any) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify({ type, payload }))
    }
  }

  return {
    connect,
    disconnect,
    isConnected,
    sendMessage,
    isSearching,
    isStartMatch,
    isRed,
    moveMessage
  }
}

export default useWebsocket
