import Hero from "@/components/hero/hero";
import FeaturedPosts from "@/components/posts/featuredPosts/featuredPosts";
import { getFeaturedPosts } from "@/lib/posts-utils";
import { Post } from "@/domain/posts/types/posts.types";

export default function Home() {
  const posts = getFeaturedPosts() as Post[];
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}
