import { Props } from "@/components/layout/layout";
import AllPosts from "@/components/posts/allPosts/allPosts";
import { getAllPosts } from "@/lib/posts-utils";
function PostsPage(props: Props) {
  return (
    <>
      <AllPosts posts={props.posts} />
    </>
  );
}

export function getServerSideProps(ctx: any) {
  const { codePillTheme } = ctx.req.cookies;
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
      theme: codePillTheme || "dark",
    },
  };
}

export default PostsPage;
