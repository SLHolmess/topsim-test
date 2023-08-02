import { getApolloClient } from './apollo-client';

import { updateUserAvatar } from './users';
import { sortObjectsByDate } from './datetime';

import {
  QUERY_ALL_POSTS_INDEX,
  QUERY_ALL_POSTS_ARCHIVE,
  QUERY_ALL_POSTS,
  QUERY_POST_BY_SLUG,
  QUERY_POSTS_BY_AUTHOR_SLUG_INDEX,
  QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE,
  QUERY_POSTS_BY_AUTHOR_SLUG,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_POST_PER_PAGE, QUERY_POSTS_BY_TAG_SLUG_ARCHIVE,
  QUERY_ALL_POSTS_SEARCH
} from "../data/posts";
import axios from 'axios';

/**
 * postPathBySlug
 */

export function postPathBySlug(slug: any) {
  return `/bai-viet/${slug}`;
}

/**
 * test
 */
export async function getSearchData(){
  try {
    const apolloClient = await getApolloClient();
    const { data } = await apolloClient.query({
      query: QUERY_ALL_POSTS_SEARCH,
    });
    
    return data.posts.edges;
  } catch (e: any) {
    console.log(`[posts][testPost] Failed to query post data: ${e.message}`);
    throw e;
  }
}


/**
 * getPostBySlug
 */

export async function getPostBySlug(slug: any) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(import.meta.env.WORDPRESS_GRAPHQL_ENDPOINT as string).host;

  let postData;
  let seoData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e: any) {
    console.log(`[posts][getPostBySlug] Failed to query post data: ${e.message}`);
    throw e;
  }

  if (!postData?.data.post) return { post: undefined };

  const post: any = [postData?.data.post].map(mapPostData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings
  if (import.meta.env.WORDPRESS_PLUGIN_SEO as any == 'true') {
    try {
      seoData = await apolloClient.query({
        query: QUERY_POST_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
      
    } catch (e: any) {
      console.log(`[posts][getPostBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.post || {};
    post.metaTitle = seo.title;
    post.metaDescription = seo.metaDesc;
    post.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      post.canonical = seo.canonical;
    }

    post.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    post.article = {
      author: post.og.author,
      modifiedTime: post.og.modifiedTime,
      publishedTime: post.og.publishedTime,
      publisher: post.og.publisher,
    };

    post.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    post.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    post,
  };
}

// /**
//  * getAllPosts
//  */

const allPostsIncludesTypes: any = {
  all: QUERY_ALL_POSTS,
  archive: QUERY_ALL_POSTS_ARCHIVE,
  index: QUERY_ALL_POSTS_INDEX,
};

export async function getAllPosts(options = {}) {
  const { queryIncludes = 'index' }: any = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPostsIncludesTypes[queryIncludes],
  });

  const posts = data?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

// /**
//  * getPostsByAuthorSlug
//  */

const postsByAuthorSlugIncludesTypes: any = {
  all: QUERY_POSTS_BY_AUTHOR_SLUG,
  archive: QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE,
  index: QUERY_POSTS_BY_AUTHOR_SLUG_INDEX,
};

export async function getPostsByAuthorSlug({ slug, ...options }: any) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByAuthorSlugIncludesTypes[queryIncludes],
      variables: {
        slug,
      },
    });
  } catch (e: any) {
    console.log(`[posts][getPostsByAuthorSlug] Failed to query post data: ${e.message}`);
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getPostsByCategoryId
 */

const postsByCategoryIdIncludesTypes: any = {
  all: QUERY_POSTS_BY_CATEGORY_ID,
  archive: QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  index: QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  tag: QUERY_POSTS_BY_TAG_SLUG_ARCHIVE,
};

export async function getPostsByTagSlug({ slug, ...options }: any) {
  const { queryIncludes = 'tag' } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        slug,
      },
    });
  } catch (e: any) {
    console.log(`[posts][getPostsByTagSlug] Failed to query post data: ${e.message}`);
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

export async function getPostsByCategoryId({ categoryId, ...options }: any) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: postsByCategoryIdIncludesTypes[queryIncludes],
      variables: {
        categoryId,
      },
    });
  } catch (e: any) {
    console.log(`[posts][getPostsByCategoryId] Failed to query post data: ${e.message}`);
    throw e;
  }

  const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
}

/**
 * getRecentPosts
 */

export async function getRecentPosts({ count, ...options }: any) {
  const { posts }: any = await getAllPosts(options);
  const sorted = sortObjectsByDate(posts);
  return {
    posts: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt: any) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}

/**
 * mapPostData
 */

export function mapPostData(post = {}) {
  const data: any = { ...post };

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    };
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar);
  }

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }: any) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getRelatedPosts
 */

export async function getRelatedPosts(categories: any, postId: any, count = 5) {
  if (!Array.isArray(categories) || categories.length === 0) return;

  let related: any = {
    category: categories && categories.shift(),
  };

  if (related.category) {
    const { posts }: any = await getPostsByCategoryId({
      categoryId: related.category.databaseId,
      queryIncludes: 'archive',
    });

    const filtered = posts.filter(({ postId: id }: any) => id !== postId);
    const sorted = sortObjectsByDate(filtered);

    related.posts = sorted.map((post: any) => ({ title: post.title, slug: post.slug }));
  }

  if (!Array.isArray(related.posts) || related.posts.length === 0) {
    const relatedPosts = await getRelatedPosts(categories, postId, count);
    related = relatedPosts || related;
  }

  if (Array.isArray(related.posts) && related.posts.length > count) {
    return related.posts.slice(0, count);
  }

  return related;
}

/**
 * sortStickyPosts
 */

export function sortStickyPosts(posts: any) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

/**
 * getPostsPerPage
 */

export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (import.meta.env.POSTS_PER_PAGE) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    return Number(import.meta.env.POSTS_PER_PAGE);
  }

  try {
    const apolloClient = getApolloClient();

    const { data } = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });
    
    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (e: any) {
    console.log(`Failed to query post per page data: ${e.message}`);
    throw e;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(posts: any, postsPerPage: any) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

/**
 * getPaginatedPosts
 */

export async function getPaginatedPosts({ currentPage = 1, ...options }: any = {}) {
  const { posts } = await getAllPosts(options);
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: undefined,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);
  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };

}

export async function getSearchPostAPI(search: string, page: number, limit: number){
  let url = "https://wp.sim.vn/wp-json/wp/v2/search?";
  url += "search="+search
  url += "&page="+page
  url += "&per_page="+limit;
  const post = await axios.get(url);

  const arrPromise = [];
  for(const v of post.data){
    arrPromise.push(new Promise(async (resolve) => {
      const resDetail = await axios.get(v._links.self[0].href);
      v['date'] = resDetail.data?.date;
      v['image'] = resDetail.data?.yoast_head_json?.og_image ? resDetail.data?.yoast_head_json?.og_image[0].url : "/src/assets/images/logo/tintuc-default.jpg";
      v['slug'] = resDetail.data?.slug;
      resolve(1);    
    }))
  }
  await Promise.all(arrPromise);
  return { data: post.data, count: post.headers['x-wp-total'], totalPage: post.headers['x-wp-totalpages'] };
}