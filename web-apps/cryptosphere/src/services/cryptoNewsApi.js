import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '532bc39fddmsh40f4a0c4b1bbe2dp160750jsn04b29ea035c4',
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi', //name of reducer
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&count=${count}`,
        ),
    }),
  }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
