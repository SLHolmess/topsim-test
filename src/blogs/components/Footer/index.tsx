import useSite from "../../hooks/use-site";
import { postPathBySlug } from "../../lib/posts";
import { categoryPathBySlug } from "../../lib/categories";
import Container from "../Container";

import styles from "./Footer.module.scss";
import logo from "../../../assets/images/logo";

const Footer = (props: any) => {
  // const { metadata = {}, recentPosts = [], categories = [] }: any = useSite();
  const { metadata = {}, recentPosts = [], categories = [] }: any = props;
  // const { title } = metadata;
  const title = "tam thoi sua sau";

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories =
    Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  return (
    // <footer className={styles.footer}>
    //   {hasMenu && (
    //       <Container>
    //         <ul className={styles.footerMenuColumns}>
    //           {hasRecentPosts && (
    //             <li>
    //               <a href="/posts/" className={styles.footerMenuTitle}>
    //                 {/* <a className={styles.footerMenuTitle}>
    //                   <strong>Recent Posts</strong>
    //                 </a> */}
    //                  <strong>Recent Posts</strong>
    //               </a>
    //               <ul className={styles.footerMenuItems}>
    //                 {recentPosts.map((post) => {
    //                   const { id, slug, title } = post;
    //                   return (
    //                     <li key={id}>
    //                       <a href={postPathBySlug(slug)}>
    //                         {/* <a>{title}</a> */}
    //                         {title}
    //                       </a>
    //                     </li>
    //                   );
    //                 })}
    //               </ul>
    //             </li>
    //           )}
    //           {hasRecentCategories && (
    //             <li>
    //               <a href="/categories/" className={styles.footerMenuTitle}>
    //                   <strong>Categories</strong>
    //               </a>
    //               <ul className={styles.footerMenuItems}>
    //                 {categories.map((category) => {
    //                   const { id, slug, name } = category;
    //                   return (
    //                     <li key={id}>
    //                       <a href={categoryPathBySlug(slug)}>
    //                         {/* <a>{name}</a> */}
    //                         {name}
    //                       </a>
    //                     </li>
    //                   );
    //                 })}
    //               </ul>
    //             </li>
    //           )}
    //           <li>
    //             <p className={styles.footerMenuTitle}>
    //               <strong>More</strong>
    //             </p>
    //             <ul className={styles.footerMenuItems}>
    //               <li>
    //                 <a href="/bai-viet/feed.xml">RSS</a>
    //               </li>
    //               <li>
    //                 <a href="/bai-viet/sitemap_index.xml">Sitemap</a>
    //               </li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </Container>
    //   )}

    //     <Container>
    //       <p>
    //         &copy; {new Date().getFullYear()} {title}
    //       </p>
    //     </Container>
    // </footer>
    <>
      <hr />
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3 sm:w-full mx-auto my-5 gap-3 footer-mobile px-3 md:px-0">
        <div className="mb-6">
          <div className="text-lg font-bold text-blue-600">
            CÔNG TY CỔ PHẨN TOPSIMVN
          </div>
          <div className="mt-4 grid grid-cols-2">
            <div>
              <div className="text-sm">Hotline</div>
              <a
                href="tel:02466888333"
                className="font-bold font-md text-orange-400"
              >
                02466.888.333
              </a>
            </div>
            <div>
              <div className="text-sm">Tư vấn phong thủy</div>
              <a href="tel:19003333" className="font-bold font-md text-orange-400">
                1900.3333
              </a>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-bold">Giờ mở cửa:</span>
            <span>08:00 - 21:00</span>
          </div>
          <div className="mt-2">
            <span>info@sim.vn</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-lg font-bold text-blue-600">THÔNG TIN</div>
          <div className="flex flex-col gap-2 mt-3">
            <a href="/dieu-khoan-va-dieu-kien-giao-dich-tai-simvn">
              Điều khoản và điều kiện
            </a>
            <a href="/chinh-sach-bao-mat-thong-tin-khach-hang-tai-simvn">
              Chính sách bảo mật
            </a>
            <a href="/chinh-sach-doi-tra"> Chính sách đổi trả</a>
            <a href="/cach-mua-sim-va-thanh-toan">
              Cách mua sim và thanh toán
            </a>
            <a href="/lien-he">Liên hệ</a>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-lg font-bold text-blue-600">
            TẢI ỨNG DỤNG SIM.VN
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="cursor-pointer">
              <img src={logo.GooglePlay} alt="" />
            </div>
            <div className="cursor-pointer">
              <img src={logo.AppStore} alt="" />
            </div>
          </div>
          <div className="text-lg font-bold text-blue-600 mt-2">
            CHỨNG NHẬN KẾT NỐI
          </div>
          <a target="_blank" href="http://online.gov.vn/Home/WebDetails/57050">
            <img src={logo.BoCongThuong} width={200} alt="" />
          </a>
        </div>
      </div>
      <div className="w-11/12 md:w-7/12 m-auto">
        <hr />
        <div className="flex justify-center py-2 text-sm">
          © Copyright 2020. All rights reserved. Version 2.0.1
        </div>
      </div>
    </>
  );
};

export default Footer;
