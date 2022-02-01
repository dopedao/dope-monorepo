import NextHead from 'next/head';

const defaultTitle = 'DOPE WARS';
const defaultDescription = 'Welcome to the streets';
const defaultOGURL = 'https://dopewars.gg';
const defaultOGImage = `${defaultOGURL}/fpo/social-card.gif`;
const favicon = '/fpo/favicon.png';

type HeadProps = {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
};

const Head = ({ title, description, url, ogImage }: HeadProps) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content={description || defaultDescription} />
    <link rel="icon" type="image/png" sizes="24x24" href={favicon} />
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title ? `${defaultTitle} | ${title}` : defaultTitle} />
    <meta property="og:description" content={description || defaultDescription} />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:secure_url" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
