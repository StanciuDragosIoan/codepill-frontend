import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(".md", "");
  const filePath = path.join(postsDirectory, `/${postSlug}/${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
    date: data.date.toString(),
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));
  const sortedPosts = allPosts.sort((postA, postB) => {
    return new Date(postA.date).getTime() - new Date(postB.date).getTime();
  });

  return sortedPosts;
}
