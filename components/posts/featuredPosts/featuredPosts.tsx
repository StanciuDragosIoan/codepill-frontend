import { Props } from "@/components/layout/layout";
import PostsGrid from "../allPosts/postGrid";
import classes from "./featuredPosts.module.css";

function FeaturedPosts(props: Props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
