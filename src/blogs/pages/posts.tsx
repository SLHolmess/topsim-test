import usePageMetadata from "../hooks/use-page-metadata";
import TemplateArchive from "../templates/archive";
import React from "react";

export default function Posts(props: any) {
  const {
    posts,
    pagination,
    pathname,
    recentPosts,
    categories,
    menus,
    searchData,
  } = props;
  const title = "All Posts";
  const slug = "posts";

  const { metadata }: any = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
    pathname,
  });

  return (
    <TemplateArchive
      title={title}
      posts={posts}
      slug={slug}
      pagination={pagination}
      metadata={metadata}
      recentPosts={recentPosts}
      categories={categories}
      menus={menus}
      searchData={searchData}
      path={"posts/"}
    />
  );
}
