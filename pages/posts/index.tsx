import { Props } from "@/components/layout/layout";
import AllPosts from "@/components/posts/allPosts/allPosts";
import { getAllPosts } from "@/lib/posts-utils";
function PostsPage(props: Props) {
  return (
    <>
      <h1>PostsPagePage</h1>
      <AllPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default PostsPage;
