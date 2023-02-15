import { Props } from "@/components/layout/layout";
import PostsGrid from "../allPosts/postGrid";
import classes from "./featuredPosts.module.css";
import globalClasses from "@/styles/shared.module.css";

function FeaturedPosts(props: Props) {
  return (
    <section className={classes.latest}>
      <h2 className={globalClasses.white}>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
