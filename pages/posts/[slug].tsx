import { GetStaticPaths, GetStaticProps } from "next";
import { getPostsFiles, getPostData } from "@/lib/posts-utils";
import PostContent from "@/components/posts/postContent/postContent";
import { Post } from "@/domain/posts/types/posts.types";
import { ParsedUrlQuery } from "querystring";
interface IParams extends ParsedUrlQuery {
  slug: string;
}

function IndividualPost({ post }: { post: Post }) {
  return (
    <>
      <h1>IndividualPostPage</h1>
      <PostContent post={post} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const { slug } = params as IParams;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },

    revalidate: 600, //faster here because it's only for 1 single post
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = getPostsFiles();

  const slugs = fileNames.map((i) => i.replace(".md", ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export default IndividualPost;
