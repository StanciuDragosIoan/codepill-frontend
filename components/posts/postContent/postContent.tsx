import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import xonokai from "react-syntax-highlighter/dist/cjs/styles/prism/xonokai";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";

import classes from "./postContent.module.css";
import globalClasses from "@/styles/shared.module.css";
import { Post } from "@/domain/posts/types/posts.types";
import PostHeader from "./postHeader";
import { SyntheticEvent, useContext } from "react";
import { UserContext } from "@/context/user";

const PostContent = ({ post }: { post: Post }) => {
  const { theme } = useContext(UserContext);
  const imagePath = `/assets/img/posts/${post.slug}/${post.image}`;

  const getEditorStyle = () => {
    return theme === "dark" ? xonokai : okaidia;
  };
  const copySnippet = (e: SyntheticEvent) => {
    const snippetCode = e.currentTarget.parentNode!.children[1].textContent;
    navigator.clipboard.writeText(snippetCode!);
  };

  const customRenderer: any = {
    p: (paragraph: { children?: boolean; node?: any }) => {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const width = 600;
        const height = 300;
        const alt = image.properties.alt;
        const srcProp = `/assets/img/posts/${post.slug}/${image.properties.src}`;
        return (
          <div className={classes.imageContainer}>
            <Image
              className={classes.image}
              priority={true}
              src={srcProp}
              width={width}
              height={height}
              alt={alt}
            />
          </div>
        );
      } else {
        return (
          <p
            className={
              theme === "dark"
                ? globalClasses.contentDark
                : globalClasses.contentLight
            }
          >
            {paragraph.children}
          </p>
        );
      }
    },
    code: (code: { children: Array<string>; node?: any; language: string }) => {
      const { language, children } = code;

      const snippet = children[0];
      return (
        <div className={classes.relative}>
          <button onClick={copySnippet} className={classes.copyBtn} aria-label="Copy code snippet">
            <i className="fa-solid fa-copy"></i>
          </button>
          <SyntaxHighlighter style={getEditorStyle()} language={language}>
            {snippet}
          </SyntaxHighlighter>
        </div>
      );
    },
  };
  return (
    <article
      className={`${classes.content} ${
        theme === "dark"
          ? globalClasses.contentDark
          : globalClasses.contentLight
      }`}
    >
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown
        className={
          theme === "dark"
            ? globalClasses.contentDark
            : globalClasses.contentLight
        }
        components={customRenderer}
        linkTarget="_blank"
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
