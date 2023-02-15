import MainNavigation from "./navigation/main-navigation";
import classes from "./layout.module.css";
import globalClasses from "@/styles/shared.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import { Post } from "@/domain/posts/types/posts.types";
import Link from "next/link";
import Logo from "./logo/logo";

export type Props = {
  children?: string | JSX.Element | JSX.Element[];
  posts?: Post[];
  post?: Post;
  title?: string;
  image?: string;
};

function Layout({ children }: Props) {
  const { theme } = useContext(UserContext);

  return (
    <div className={theme === "dark" ? classes.dark : classes.light}>
      <MainNavigation />
      <div className={classes.container}>
        <main>{children}</main>{" "}
      </div>
      <footer
        className={`${classes.footer} ${
          theme === "dark" ? globalClasses.navDarkBg : globalClasses.navLightBg
        }`}
      >
        <Link href="/">
          <Logo />
        </Link>
      </footer>
    </div>
  );
}

export default Layout;
