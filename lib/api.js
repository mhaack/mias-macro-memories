async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.STORYBLOK_API_KEY,
      Version: preview ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllImagesWithSlug() {
  const data = await fetchAPI(`
      {
        MacroimageItems {
          items {
            full_slug
          }
        }
      }
    `)
  return data?.MacroimageItems.items
}

export async function getAllTags() {
  const data = await fetchAPI(`
      {
        Tags {
          items {
            name
          }
        }
      }
    `)
  return data?.Tags?.items
}

export async function getAllImagesForHome(preview) {
  const data = await fetchAPI(
    `
    query MacroimageItems {
      MacroimageItems(sort_by: "first_published_at:desc") {
        items {
          full_slug
          published_at
          content {
            title
            latin
            image {
              filename
            }
          }
        }
      }
    }
    `,
    { preview }
  )
  return data?.MacroimageItems.items
}

export async function getAllImagesForTag(tag, preview) {
  const data = await fetchAPI(
    `
    query MacroimageItems($tag: String!) {
      MacroimageItems(with_tag: $tag, sort_by: "first_published_at:desc") {
        items {
          full_slug
          published_at
          content {
            title
            latin
            image {
              filename
            }
          }
        }
      }
    }
    `,
    {
      preview,
      variables: {
        tag: `${tag}`,
      },
    }
  )
  return data?.MacroimageItems.items
}

export async function getPreviewMacroImageBySlug(slug) {
  const data = await fetchAPI(
    `
    query MacroimageItem($slug: ID!) {
      MacroimageItem(id: $slug) {
        full_slug
      }
    }
    `,
    {
      preview: true,
      variables: {
        slug: `${slug}`,
      },
    }
  )
  return data
}

export async function getImageBySlug(slug, preview) {
  const data = await fetchAPI(
    `
    query MacroimageItemBySlug($slug: ID!) {
      MacroimageItem(id: $slug) {
        full_slug
        published_at
        tag_list
        content {
          title
          latin
          image {
            filename
          }
        }
      }
    }
    `,
    {
      preview,
      variables: {
        slug: `${slug}`,
      },
    }
  )

  return data?.MacroimageItem
}
