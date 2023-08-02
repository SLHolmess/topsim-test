import Nav from "../Nav";
import Footer from "../Footer";

const Layout = (props: any) => {
  const { children, homepage, recentPosts, categories, menus, searchData } =
    props;

  const asPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div style={{backgroundColor: "#f1f5f8"}}>

      <Nav menus={menus} searchData={searchData} />

      <div className="md:w-12/12 xl:w-9/12 2xl:w-8/12 m-auto">{children}</div>

      {/* <Footer recentPosts={recentPosts} categories={categories} /> */}
    </div>
  );
};

export default Layout;
