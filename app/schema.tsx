import SchemaScript from "@/components/schema-script"

export default function Schema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BebekPlan",
    url: "https://bebekplan.com",
    description:
      "Hamilelikten bebeklik dönemine kadar gelişim sürecini kolayca takip etmenizi sağlayan kapsamlı uygulama",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://bebekplan.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: ["https://facebook.com/bebekplan", "https://instagram.com/bebekplan", "https://twitter.com/bebekplan"],
    publisher: {
      "@type": "Organization",
      name: "BebekPlan",
      logo: {
        "@type": "ImageObject",
        url: "https://bebekplan.com/logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Gelişim Takibi",
          url: "https://bebekplan.com/gelisim-takibi",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Doğum Sayacı",
          url: "https://bebekplan.com/dogum-sayaci",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Beslenme Önerileri",
          url: "https://bebekplan.com/beslenme",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          url: "https://bebekplan.com/blog",
        },
      ],
    },
  }

  return <SchemaScript data={structuredData} />
}
