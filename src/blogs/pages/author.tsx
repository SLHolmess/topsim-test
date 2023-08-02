import usePageMetadata from "../hooks/use-page-metadata";
import { getPaginatedPosts } from "../lib/posts";
import TemplateArchive from "../templates/archive";

export default function Categories(props: any) {
  const { user, posts, menus, recentPosts, searchData, categories } = props;
  const { title, name, avatar, description, slug } = user;
  const postOptions = {
    excludeMetadata: ["author"],
  };

  return (
    <TemplateArchive
      menus={menus}
      recentPosts={recentPosts}
      searchData={searchData}
      categories={categories}
      title={name}
      thumbnail={avatar}
      posts={posts}
      postOptions={postOptions}
      slug={slug}
      metadata="1"
      path={"authors/"}
    />
  );
}
