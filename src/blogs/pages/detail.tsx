import Layout from "src/blogs/components/Layout";
import Content from "src/blogs/components/Content";

import styles from "src/blogs/styles/pages/Post.module.scss";
import Footer from "../components/Footer";
import moment from "moment";
import classes from "../components/PageBody/PageBody.module.scss";

export default function Post(props: any) {
  const { post, related, menus, searchData, categories, recentPosts } = props;

  // let title = post ? post.title : "";
  // let content = post ? post.content : "";
  // let date = post ? post.date : "";
  // let author = post ? post.author : "";
  // let categoriesPage = post ? post.categories : "";
  // let modified = post ? post.modified : "";
  // let isSticky = post ? post.isSticky : false;

  // const metadataOptions = {
  //   compactCategories: false,
  // };


  const { posts: relatedPostsList, title: relatedPostsTitle } = related || {};

  return (
    <>
      {post ? (
        <Layout
          categories={categories}
          menus={menus}
          searchData={searchData}
          recentPosts={recentPosts}
        >
          <div className="px-3">
          <h1 className={styles.postTitle}>{post?.title ?? ""}</h1>
          </div>
          {/* <Content> */}
          <div
            className={`${styles.postContent} text-justify mb-3 px-3`}
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          />
          {/* </Content> */}
          <div className="my-5 flex justify-end px-3">
            <div className="flex gap-5 items-center">
              <span>Đăng ngày {moment(post?.date).format("DD/MM/YYYY")}</span>{" "}
              bởi
              <div className="flex gap-3">
                <div
                  className={styles.author}
                  style={{
                    backgroundImage: `url(${post?.author?.avatar?.url})`,
                  }}
                />
                <span className="font-semibold text-xl italic">
                  {post?.author?.name}
                </span>
              </div>
            </div>
          </div>
          {relatedPostsList && relatedPostsList.length > 0 &&
            <div className="col-span-3 mt-5">
            <span className={classes.rightSideTitle}>Bài viết liên quan</span>
            <div className={classes.rightSideLine} />
            <div className="flex flex-col mt-3">
              {relatedPostsList.map((i: any) => (
                <a
                  href={`/bai-viet/${i.slug}/`}
                  className={classes.categoryItem}
                >
                  {i.title}
                </a>
              ))}
            </div>
          </div>
          }
          
          <Footer />
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}
