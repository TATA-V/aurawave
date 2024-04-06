module.exports = {
  siteUrl: 'https://www.aurawave.site/',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], 
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://www.aurawave.site/server-sitemap-index.xml`,
    ],
  },
}