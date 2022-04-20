import type { NextApiRequest, NextApiResponse } from 'next'

export default async function exit(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.clearPreviewData()

  res.writeHead(307, { Location: '/' })
  res.end()
}
