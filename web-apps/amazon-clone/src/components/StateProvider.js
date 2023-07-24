// setup data layer

import React, { createContext, useContext, useReducer } from 'react'

// this is data layer
export const StateContext = createContext()

// build a provider - wrap app inside provider and provide data to data layer

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

// to use in component
export const useStateValue = () => useContext(StateContext)
