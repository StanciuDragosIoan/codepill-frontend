import Link from "next/link";
import classes from "./postItem.module.css";
import Image from "next/image";
import { Props } from "@/components/layout/layout";

function PostItem(props: Props) {
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
      <li className={classes.post}>
        <Link href={linkPath} target="_blank">
          <div className={classes.image}>
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
