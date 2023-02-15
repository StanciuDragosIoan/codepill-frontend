import { Props } from "@/components/layout/layout";
import Image from "next/image";
import classes from "./postHeader.module.css";

function PostHeader(props: Props) {
  const { title, image } = props;

  if (title && image) {
    return (
      <header className={classes.header}>
        <h1>{title}</h1>

        <Image src={image} alt={title} width={200} height={150} />
      </header>
    );
  } else {
    return <p>No content here...</p>;
  }
}

export default PostHeader;
