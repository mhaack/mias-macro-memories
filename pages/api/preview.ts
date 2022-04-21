import type { NextApiRequest, NextApiResponse } from 'next'
import { getPreviewMacroImageBySlug } from '../../lib/api'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (
    req.query.secret !== process.env.STORYBLOK_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const macroImage = await getPreviewMacroImageBySlug(req.query.slug)
  if (!macroImage) {
    return res.status(401).json({ message: 'Invalid slug' })
  }


  res.setPreviewData({})
  const slug = macroImage?.MacroimageItem['full_slug']
  res.writeHead(307, { Location: `/images/${slug}` })
  res.end()
}
