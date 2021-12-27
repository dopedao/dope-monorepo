export type Author = {
  name: string;
  picture: string;
};

export type PostType = {
  template: 'news';
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export type DopePostType = {
  template: 'dope-news';
  title: string;
  location: string;
  date: string;
  edition: string;
  $paper?: number;
  description: string;
  subTitleLeft1: string;
  subTitleLeft2: string;
  subTitleRight: string;
  coverImage: string;
  textLeft1: string;
  textLeft2: string;
  textRight1: string;
  textRight2: string;
  textMiddle1: string;
  textMiddle2: string;
  imageText: string;

  author?: Author;
  excerpt?: string;
  ogImage?: {
    url: string;
  };
  content?: string;
};
