/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://chargecity.co",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api",
      },
    ],
  },
};
