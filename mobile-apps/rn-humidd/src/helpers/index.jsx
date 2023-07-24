import { useEffect, useRef, createContext } from 'react'

export const CalcContext = createContext()

export function useFirstRender() {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}

export function computeHumidity(tIn, tOut, hOut) {
  const satVarPIn = 6.122 * Math.exp((17.62 * tIn) / (243.12 + tIn))
  const satVarPOut = 6.122 * Math.exp((17.62 * tOut) / (243.12 + tOut))
  const result = ((tIn + 273) * hOut * satVarPOut) / ((tOut + 273) * satVarPIn)
  return result > 99 ? 99 : result
}

export function cToF(celsius) {
  return (celsius * 9) / 5 + 32
}

export function fToC(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9
}
