const { description } = require("../../package");

module.exports = {
  ga: "UA-123350461-1",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Christian Esquivel",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "About Me",
        link: "/",
      },
      {
        text: "Experience",
        link: "/jobs",
      },
      {
        text: "Technologies",
        link: "/tech",
      },
      {
        text: "Github",
        link: "https://github.com/chrisEsk?tab=stars",
      },
      {
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/christian-esquivel-41b6043a/",
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
