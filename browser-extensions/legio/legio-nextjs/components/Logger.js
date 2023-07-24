import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

const REFRESH_INTERVAL = 1000

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Logger = () => {
  const { data, error, isLoading } = useSWR('/api/log', fetcher, {
    refreshInterval: REFRESH_INTERVAL,
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="logger">
      {data &&
        data.map((x) => (
          <Link href={x.url} target="_blank">
            <div className="logger__row" key={`${x}`}>
              <Image
                className="logger__icon"
                src={x.favIconUrl}
                width={16}
                height={16}
                alt=""
              />
              <div className="logger__link">{x.title}</div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Logger
