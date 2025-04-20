module.exports = {
  siteUrl: 'https://aurawave.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], 
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://aurawave.vercel.app/server-sitemap-index.xml`,
    ],
  },
}