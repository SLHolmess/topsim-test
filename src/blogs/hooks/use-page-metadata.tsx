import { useContext } from 'react';
// import { useRouter } from 'next/router';

import { SiteContext } from './use-site';

import { constructPageMetadata } from '../lib/site';
import { config } from "../lib/util"

export default function usePageMetadata(props: any) {
  const pageMetadata = props.metadata;
  const pathname = props.pathname;
  // const { homepage = '', defaultMetadata = {} }: any = useContext(SiteContext);
  const homepage = config.homepage;
  const defaultMetadata = {};

  //   const router = useRouter();

  const metadata = constructPageMetadata(defaultMetadata, pageMetadata, {
    homepage,
    pathname
    // router,
  });


  return {
    metadata,
  };
}
