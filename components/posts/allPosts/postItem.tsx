import Link from "next/link";
import classes from "./postItem.module.css";
import Image from "next/image";
import { Props } from "@/components/layout/layout";
import globalClasses from "@/styles/shared.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/user";

function PostItem(props: Props) {
  const { theme } = useContext(UserContext);
  const { post } = props;
  if (post) {
    const { title, image, excerpt, date, slug } = post;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const imagePath = `/assets/img/posts/${slug}/${image}`;
    const linkPath = `/posts/${slug}`;

    return (
      <li
        className={`${classes.post} ${
          theme === "dark"
            ? globalClasses.contentDark
            : globalClasses.contentLight
        } ${globalClasses.card}`}
      >
        <Link href={linkPath} target="_blank">
          <div className={`${classes.image}`}>
            <Image
              src={imagePath}
              alt={title}
              width={350}
              height={200}
              priority={true}
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </Link>
      </li>
    );
  } else {
    return <h3>No contents</h3>;
  }
}

export default PostItem;
