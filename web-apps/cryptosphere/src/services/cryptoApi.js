import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '532bc39fddmsh40f4a0c4b1bbe2dp160750jsn04b29ea035c4',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/'

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi', //name of reducer
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => {
        return createRequest(
          `/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,
        )
      },
    }),
    getCryptoExchanges: builder.query({
      query: (count) => {
        return createRequest(
          `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=${count}&offset=0&orderBy=24hVolume&orderDirection=desc`,
        )
      },
    }),
  }),
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApi
