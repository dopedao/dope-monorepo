import { PostType } from 'features/news/types';

export const splitPosts = (posts: PostType[], twoColumns: boolean = false) => {
  const middlePosts: typeof posts = [];
  const leftPosts: typeof posts = [];
  const rightPosts: typeof posts = [];

  if (twoColumns) {
    posts.forEach(post => {
      if (middlePosts.length < rightPosts.length - 2) middlePosts.push(post);
      else rightPosts.push(post);
    });
  } else {
    posts.forEach(post => {
      if (middlePosts.length < leftPosts.length - 1 && middlePosts.length < rightPosts.length - 1)
        middlePosts.push(post);
      else if (leftPosts.length <= rightPosts.length) leftPosts.push(post);
      else if (rightPosts.length < leftPosts.length) rightPosts.push(post);
    });
  }
  return {
    middlePosts,
    leftPosts,
    rightPosts,
  };
};
