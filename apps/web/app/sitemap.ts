import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://khama.dz'

  // In a real app, you would fetch these from your database
  const fabricIds = [1, 2, 3, 4, 5]
  const supplierIds = [1, 2, 3]

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ]

  const fabricRoutes = fabricIds.map((id) => ({
    url: `${baseUrl}/catalogue/product/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const supplierRoutes = supplierIds.map((id) => ({
    url: `${baseUrl}/suppliers/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...fabricRoutes, ...supplierRoutes]
}
