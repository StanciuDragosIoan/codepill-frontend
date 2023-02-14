import { Props } from "@/components/layout/layout";
import PostItem from "./postItem";
import classes from "./postsGrid.module.css";

function PostsGrid(props: Props) {
  const { posts } = props;
  if (posts) {
    return (
      <ul className={classes.grid}>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </ul>
    );
  } else {
    return <h1>No posts</h1>;
  }
}

export default PostsGrid;
