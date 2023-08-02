import { authorPathByName } from './users';
import { postPathBySlug } from './posts';
import { pagePathBySlug } from './pages';

// import config from '../../package.json';
import { config } from './util';

export function ArticleJsonLd({ post = {}, siteTitle = '' }) {
  const { homepage = '', faviconPath = '/favicon.ico' }: any = config;
  const { title, slug, excerpt, date, author, categories, modified, featuredImage }: any = post;
  const path = postPathBySlug(slug);
  const datePublished: any = !!date && new Date(date);
  const dateModified = !!modified && new Date(modified);

  /** TODO - As image is a recommended field would be interesting to have a
   * default image in case there is no featuredImage comming from WP,
   * like the open graph social image
   * */

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${homepage}${path}`,
    },
    headline: title,
    image: [featuredImage?.sourceUrl],
    datePublished: datePublished ? datePublished.toISOString() : '',
    dateModified: dateModified ? dateModified.toISOString() : datePublished.toISOString(),
    description: excerpt,
    keywords: [categories.map(({ name }: any) => `${name}`).join(', ')],
    copyrightYear: datePublished ? datePublished.getFullYear() : '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${homepage}${faviconPath}`,
      },
    },
  };
  return JSON.stringify(jsonLd)

}

export function LocalBusinessJsonLd() {
  const { homepage = '' } = config;
  const description = 'SIMvn - Tổng kho SIM số đẹp kho số lên đến hơn 35.000.000 sim các mạng Viettel, Vinaphone, Mobifone, Gmobile,' +
    ' ITel, Vietnamobile chỉ từ 199.000vnd.' +
    ' Địa Chỉ: Quận Ba Đình, Hà Nội, SĐT: 02466.888.333';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': homepage,
    name: 'Công Ty Cổ Phần Sim.vn',
    hasMap: 'https://goo.gl/maps/nqG67GikS1JixMQt5',
    logo: 'https://sim.vn/logo.png',
    telephone: '02466888333',
    email: 'info@sim.vn',
    sameAs: ['https://www.facebook.com/websim.vn', 'https://www.youtube.com/channel/UCUN3n4_vkb5ESHBk08EIzWw'],
    url: homepage,
    image: 'https://sim.vn/logo.png',
    priceRange: '$5 - $100000',
    description: description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tầng 2, nhà B, số 22 đường Thành Công, Phường Thành Công, Quận Ba Đình',
      addressLocality: 'Hà Nội',
      addressRegion: 'Vietnam',
      postalCode: '100000',
      addressCountry: 'VN'
    },
    geo: {
      '@type': 'GeoCoordinates',
latitude: '21.02227296008678',
      longitude: '105.81632523837165'
    },
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  return JSON.stringify(jsonLd)
}

export function OrganizationJsonLd() {
  const { homepage = '' } = config;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Công Ty Cổ Phần Sim.vn',
    alternateName: 'SIMvn',
    url: homepage,
    logo: 'https://sim.vn/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '02466888333',
      contactType: 'sales',
      contactOption: ['TollFree', 'HearingImpairedSupported'],
      areaServed: 'VN',
      availableLanguage: ['en', 'Vietnamese']
    }
  };
  return JSON.stringify(jsonLd)
}

export function NewsArticleJsonLd({
                                    h1 = "",
                                    images = [],
                                    description = "",
                                    datePublished = "",
                                    dateModified = "",
                                    name = "",
                                    urlAuthor = ""
                                  }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: h1,
    image: images,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified,
    author: [{
      "@type": "Person",
      "name": name,
      url: urlAuthor
    }]
  };
  return JSON.stringify(jsonLd)
}
export function WebsiteJsonLd({ siteTitle = '' }) {
  const { homepage = '' } = config;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify(jsonLd)
}

export function WebpageJsonLd({ title = '', description = '', siteTitle = '', slug = '' }) {
  const { homepage = '' } = config;
  const path = pagePathBySlug(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${homepage}${path}`,
    publisher: {
      '@type': 'ProfilePage',
      name: siteTitle,
    },
  };
  return JSON.stringify(jsonLd)
}

export function AuthorJsonLd(author: any) {
  const { homepage = '' } = config;
  const { name, avatar, description }: any = author;
  const path = authorPathByName(name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    image: avatar?.url,
    url: `${homepage}${path}`,
    description: description,
  };
  return JSON.stringify(jsonLd)
}

export function LogoJsonLd() {
  const { homepage = '', faviconPath = '/favicon.ico' }: any = config;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: `${homepage}`,
    logo: `${homepage}${faviconPath}`,
  };
  return JSON.stringify(jsonLd)
}
