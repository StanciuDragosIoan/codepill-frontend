import { getPostData } from "@/lib/posts-utils";
import PostContent from "@/components/posts/postContent/postContent";
import { Post } from "@/domain/posts/types/posts.types";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug) as Post;
  return { title: post.title };
}

export default async function IndividualPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug) as Post;
  return <PostContent post={post} />;
}
