import usePageMetadata from '../hooks/use-page-metadata';
import { getPaginatedPosts } from '../lib/posts';
import TemplateArchive from '../templates/archive';

export default function Categories(props: any) {
  const { category, posts, menus, categories, searchData, recentPosts } = props
  const { name, description, slug } = category;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description: description || category.og?.description || `Read ${posts.length} posts from ${name}`,
    },
  });

  return <TemplateArchive recentPosts={recentPosts} title={name} posts={posts} slug={slug} metadata={metadata} menus={menus} categories={categories} path={'categories/'} />;


  // return (<div>
  //   <h1>{JSON.stringify(pagination)}</h1>
  // </div>)
}


