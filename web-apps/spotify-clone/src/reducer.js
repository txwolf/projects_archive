export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  discoverWeekly: null,
  token: null,
  // 'BQAg3-FWmzU-bEVbiUVZLzqdSBL8LG6wwfXgs7BK7dxlbxxnt3LztMMKP6RCgUEhPeje4pt0-U3YpuPVUmhVnBftvqzMaoF033lOTg-zEDGBWyPfNhsE6lA-xhlPrns4OiaorEOdtPTjjVYUfoIeiQ9nAhT_IiyXkIHcxURbqMU7aRstW_VA',
}

const reducer = (state, action) => {
  console.log('⚡️ action', action)
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      }
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      }
    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discoverWeekly: action.discoverWeekly,
      }
    default:
      return state
  }
}

export default reducer
