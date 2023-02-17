import Hero from "@/components/hero/hero";
import FeaturedPosts from "@/components/posts/featuredPosts/featuredPosts";
import { Props } from "@/components/layout/layout";
import { getFeaturedPosts } from "@/lib/posts-utils";
export default function Home(props: Props) {
  const { posts } = props;

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
