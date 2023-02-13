import React, { ReactNode, ReactElement, JSXElementConstructor } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Post } from "@/pages/posts/[slug]";

type NodeToProps<T> = {
  node: T;
  children: T extends { children: any } ? ReactNode : never;
};

// type CustomRenderers = {
//   [K in Content["type"]]?: (
//     props: NodeToProps<Extract<Content, { type: K }>>
//   ) => ReactElement;
// };

const PostContent = ({ post }: { post: Post }) => {
  const customRenderer: any = {
    p: (paragraph: { children?: boolean; node?: any }) => {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        console.log("IMG RENDER");
        const image = node.children[0];
        const width = 600;
        const height = 300;
        const alt = image.properties.alt;
        const srcProp = `/assets/img/posts/${post.slug}/${image.properties.src}`;
        return (
          <Image
            src={srcProp}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
          />
        );
      } else {
        return <p>{paragraph.children}</p>;
      }
    },
  };
  return (
    <>
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </>
  );
};

export default PostContent;
