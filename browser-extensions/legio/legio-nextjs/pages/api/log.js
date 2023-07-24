import NextCors from 'nextjs-cors'
import logDefault from '../../data/log.json'

let log = logDefault

const LOG_SIZE = 20

const saveData = (data) => {
  if (log.length > LOG_SIZE) log.pop()
  log.unshift(data)
}

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const requestMethod = req.method

  if (requestMethod === 'POST') {
    console.log(req.body)
    const data = {
      favIconUrl: req.body?.favIconUrl,
      url: req.body?.url,
      title: req.body?.title,
    }
    saveData(data)
    res.status(200).json(data)
  } else {
    res.status(200).json(log)
  }
}

export default handler
