import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@config';

import { JotaiProvider } from './_providers/jotai';

import type { FC, ReactNode } from 'react';

import 'destyle.css/destyle.min.css';
import './globals.scss';
import './variables.scss';

type Props = {
  children: ReactNode;
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s - ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: '',
    creator: '',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const RootLayout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
