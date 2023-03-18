import { GetStaticPaths, GetStaticProps } from "next";
import { getPostsFiles, getPostData } from "@/lib/posts-utils";
import PostContent from "@/components/posts/postContent/postContent";
import { Post } from "@/domain/posts/types/posts.types";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
interface IParams extends ParsedUrlQuery {
  slug: string;
}

function IndividualPost({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <PostContent post={post} />
    </>
  );
}

export function getServerSideProps(ctx: any) {
  const { params } = ctx;

  const { slug } = params as IParams;

  const postData = getPostData(slug);

  const { codePillTheme } = ctx.req.cookies;

  return {
    props: {
      post: postData,
      theme: codePillTheme || "light",
    },
  };
}

export default IndividualPost;
