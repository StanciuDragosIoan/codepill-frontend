import AllPosts from "@/components/posts/allPosts/allPosts";
import { getAllPosts } from "@/lib/posts-utils";
import { Post } from "@/domain/posts/types/posts.types";

export default function PostsPage() {
  const posts = getAllPosts() as Post[];
  return <AllPosts posts={posts} />;
}
