// background.js

// get url of current tab
const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const json = await response.json()
  console.log(json)
  return response
}

// trigger getting url on opening new tab
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  const URL = 'https://legio-nextjs.vercel.app/api/log'

  if (changeInfo.status == 'complete') {
    const currentTab = await getCurrentTab()

    // check if page is external
    if (
      currentTab.url.includes('localhost') ||
      currentTab.url.includes('chrome://')
    ) {
      return
    }
    // post current tab to the backend
    postData(URL, currentTab).catch((error) => {
      console.log(error.message)
    })
  }
})
