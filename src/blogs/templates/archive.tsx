import { Helmet } from "react-helmet";

import { helmetSettingsFromMetadata } from "../lib/site";
import { config } from "../lib/util";

import Layout from "../components/Layout";
import Pagination from "../components/Pagination/";

// import styles from 'styles/templates/Archive.module.scss';
import { GeneralFeed, SingleFeed } from "../lib/feed";
import { pagePathBySlug } from "../lib/pages";
import PageHeader from "../components/PageHeader";
import PageBody from "../components/PageBody";
import Footer from "../components/Footer";

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive(props: any) {
  const {
    title = "Archive",
    posts,
    postOptions = DEFAULT_POST_OPTIONS,
    slug,
    metadata,
    pagination,
    path = "",
    recentPosts,
    categories,
    menus,
    searchData,
  } = props;
  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout
      homepage={config.homepage}
      metadata={metadata}
      recentPosts={recentPosts}
      categories={categories}
      menus={menus}
      // searchData={searchData}
    >
      <Helmet {...helmetSettings} />

      <GeneralFeed />
      <SingleFeed title={title} href={pagePathBySlug(path + slug) + "/feed/"} />
      {/* <Header>
        <Container>
          <h1>{Title || title}</h1>
          {metadata.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: metadata.description,
              }}
            />
          )}
        </Container>
      </Header> */}

        {Array.isArray(posts) && (
          <>
            {
              !searchData ? <PageHeader posts={posts} /> : null
            }
            
            <PageBody posts={posts} categories={categories} searchData={searchData} />
            {pagination && (
              <Pagination
                currentPage={pagination?.currentPage}
                pagesCount={pagination?.pagesCount}
                basePath={pagination?.basePath}
              />
            )}
          </>
        )}
      <Footer />
    </Layout>
  );
}
