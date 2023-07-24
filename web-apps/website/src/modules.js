import { useState, useEffect, useRef } from 'react'

export function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false)

  useEffect(() => {
    let timerId
    if (startLongPress) {
      timerId = setTimeout(callback, ms)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [callback, ms, startLongPress])

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  }
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

//https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render
export function useFirstRender() {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}
