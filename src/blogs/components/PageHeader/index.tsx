import React from "react";
import classes from "./PageHeader.module.scss";
import moment from "moment";

const PageHeader = (props: any) => {
  const { posts } = props;

  const firstPost = posts[0];
  const secondPost = posts[1];
  const thirdPost = posts[2];
  const finalHeadPost = posts[3];

  return (
    <div className="mt-2 px-2">
      <div className="my-3 font-semibold italic">sim.vn {`>`} Tin tức</div>
      <div className="md:grid md:grid-cols-2 gap-3">
        <div
          style={{
            backgroundImage: `url(${firstPost?.featuredImage?.sourceUrl})`,
          }}
          className={`${classes.bgFirst} ${classes.thumbnailPost}`}
        >
          <a href={`/bai-viet/${firstPost?.slug}/`}>
            <div
              className={`flex flex-col justify-end gap-2 ${classes.contents} ${classes.bottomLayer}`}
            >
              <div>
                {firstPost?.categories?.map((i: any, index: number) => (
                  <div key={index} className="bg-slate-600 float-left px-3 py-1 rounded-md">
                    {i.name}
                  </div>
                ))}
              </div>
              <span>{firstPost?.title}</span>
              <div className="flex gap-2">
                <div
                  className={classes.avatarAuthor}
                  style={{
                    backgroundImage: `url(${firstPost?.author?.avatar?.url})`,
                  }}
                />
                <div className="text-slate-100 font-semibold">
                  {firstPost?.author?.name}
                </div>
                <div className="text-slate-200">
                  - {moment(firstPost?.date).format("HH:mm DD/MM/YYYY")}
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <div
            style={{
              backgroundImage: `url(${secondPost?.featuredImage?.sourceUrl})`,
            }}
            className={`${classes.bgSecond} ${classes.thumbnailPost}`}
          >
            <a href={`/bai-viet/${secondPost?.slug}`}>
              <div
                className={`flex flex-col justify-end gap-2 ${classes.contents} ${classes.bottomLayer}`}
              >
                <div>
                  {secondPost?.categories?.map((i: any) => (
                    <div className="bg-slate-600 float-left px-3 py-1 rounded-md">
                      {i.name}
                    </div>
                  ))}
                </div>
                <span>{secondPost?.title}</span>
                <div className="flex gap-2">
                  <div
                    className={classes.avatarAuthor}
                    style={{
                      backgroundImage: `url(${secondPost?.author?.avatar?.url})`,
                    }}
                  />
                  <div className="text-slate-100 font-semibold">
                    {secondPost?.author?.name}
                  </div>
                  <div className="text-slate-200">
                    - {moment(secondPost?.date).format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="md:grid md:grid-cols-2 gap-3">
            <div
              style={{
                backgroundImage: `url(${thirdPost?.featuredImage?.sourceUrl})`,
              }}
              className={`${classes.bgSecond} ${classes.thumbnailPost}`}
            >
              <a href={`/bai-viet/${thirdPost?.slug}`}>
                <div
                  className={`flex flex-col justify-end gap-2 ${classes.contents} ${classes.layerFull}`}
                >
                  <div>
                    {thirdPost?.categories?.map((i: any) => (
                      <div className="bg-slate-600 float-left px-3 py-1 rounded-md">
                        {i.name}
                      </div>
                    ))}
                  </div>
                  <span>{thirdPost?.title}</span>
                  <div className="flex gap-2">
                    <div
                      className={classes.avatarAuthor}
                      style={{
                        backgroundImage: `url(${thirdPost?.author?.avatar?.url})`,
                      }}
                    />
                    <div className="text-slate-100 font-semibold">
                      {thirdPost?.author?.name}
                    </div>
                    <div className="text-slate-200">
                      - {moment(thirdPost?.date).format("HH:mm DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div
              style={{
                backgroundImage: `url(${finalHeadPost?.featuredImage?.sourceUrl})`,
              }}
              className={`${classes.bgSecond} ${classes.thumbnailPost}`}
            >
              <a href={`/bai-viet/${finalHeadPost?.slug}`}>
                <div
                  className={`flex flex-col justify-end gap-2 ${classes.contents} ${classes.layerFull}`}
                >
                  <div>
                    {finalHeadPost?.categories?.map((i: any) => (
                      <div className="bg-slate-600 float-left px-3 py-1 rounded-md">
                        {i.name}
                      </div>
                    ))}
                  </div>
                  <span>{finalHeadPost?.title}</span>
                  <div className="flex gap-2">
                    <div
                      className={classes.avatarAuthor}
                      style={{
                        backgroundImage: `url(${finalHeadPost?.author?.avatar?.url})`,
                      }}
                    />
                    <div className="text-slate-100 font-semibold">
                      {finalHeadPost?.author?.name}
                    </div>
                    <div className="text-slate-200">
                      - {moment(finalHeadPost?.date).format("HH:mm DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
