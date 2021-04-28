import { NextApiResponse, NextApiRequest } from 'next'
import { getAllNotesData } from 'lib/note'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const results = getAllNotesData()

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ results }))
}
