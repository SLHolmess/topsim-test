import React from "react";
import classes from "./PageBody.module.scss";
import moment from "moment";

const PageBody = (props: any) => {
  const { posts, categories, searchData } = props;
  return (
    <div className="md:grid md:grid-cols-12 mt-10 gap-8 px-2">
      <div className="col-span-9">
        <span className={classes.leftSideTitle}>{ searchData ? "Tin Tìm Kiếm" : "Tin Nổi Bật" }</span>
        <div className={classes.leftSideLine} />
        <div className="mt-3 md:grid md:grid-cols-2 gap-5">
          {posts.map((post: any, index: number) => (
            <a href={`/bai-viet/${post?.slug}/`} key={index} className="flex gap-2 mt-3">
              <img
                src={searchData ? post.image : post?.featuredImage?.sourceUrl}
                style={{ objectFit: "contain" }}
                width="170px"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{post.title}</span>
                <span className="text-slate-500">{moment(post.date).format("DD/MM/YYYY")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="col-span-3 mt-5">
        <span className={classes.rightSideTitle}>Danh mục</span>
        <div className={classes.rightSideLine} />
        <div className="flex flex-col mt-3">
          {categories.map((i: any) => (
            <a
              href={`/bai-viet/categories/${i.slug}/`}
              className={classes.categoryItem}
            >
              {i.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBody;
