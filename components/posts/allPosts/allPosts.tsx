import { Props } from "@/components/layout/layout";
import classes from "./allPosts.module.css";
import PostsGrid from "./postGrid";

function AllPosts(props: Props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
