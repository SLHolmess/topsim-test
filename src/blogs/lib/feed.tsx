import { Helmet } from "react-helmet";
// import config from "../../package.json";
import { config } from "./util";

export function GeneralFeed() {
  const { homepage = "" } = config;
  return (
    <Helmet encodeSpecialCharacters={false}>
      <link rel="alternate" type="application/rss+xml" title={"Dòng thông tin SimVN"} href={homepage + "/bai-viet/feed.xml"} />
      <link rel="alternate" type="application/rss+xml" title={"Dòng phản hồi SimVN"}
            href={homepage + "/bai-viet/comments/feed/"} />
    </Helmet>
  );
}

export function SingleFeed({ title = "", href = "" }) {
  const { homepage = "" } = config;
  return (
    <Helmet encodeSpecialCharacters={false}>
      <link rel="alternate" type="application/rss+xml" title={title} href={homepage + '/bai-viet'+href} />
    </Helmet>
  );
}