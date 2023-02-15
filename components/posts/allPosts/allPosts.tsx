import { Props } from "@/components/layout/layout";
import classes from "./allPosts.module.css";
import PostsGrid from "./postGrid";

function AllPosts(props: Props) {
  return (
    <section className={classes.posts}>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
