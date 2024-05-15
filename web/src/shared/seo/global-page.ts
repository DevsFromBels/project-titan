export function generateGlobalLD() {
  const JsonLdGlobal = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Titan Advertisement",
    url: "https://titanproject.top/",
    sameAs: [
      // "https://www.facebook.com/titanproject",
      // "https://twitter.com/titanproject",
      "https://t.me/sh1woo",
    ],
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: "https://titanproject.top/search?q={search_term_string}",
    //   "query-input": "required name=search_term_string",
    // },
    navigation: [
      {
        "@type": "SiteNavigationElement",
        name: "Market",
        url: "https://titanproject.top/market",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Profile",
        url: "https://titanproject.top/profile",
      },
    ],
  };
  return JSON.stringify(JsonLdGlobal);
}
