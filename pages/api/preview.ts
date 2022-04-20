import type { NextApiRequest, NextApiResponse } from 'next'
import { getPreviewMacroImageBySlug } from '../../lib/api'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STORYBLOK_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const macroImage = await getPreviewMacroImageBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!macroImage) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/images/${macroImage?.MacroimageItem?.slug}` })
  res.end()
}
