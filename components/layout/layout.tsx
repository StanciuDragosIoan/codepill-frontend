import { useEffect, useContext } from "react";
import { sendAnalyticsEvent } from "@/lib/analytics";
import MainNavigation from "./navigation/main-navigation";
import classes from "./layout.module.css";
import globalClasses from "@/styles/shared.module.css";
import { UserContext } from "@/context/user";
import { Post } from "@/domain/posts/types/posts.types";
import Link from "next/link";

export type Props = {
  children?: string | JSX.Element | JSX.Element[];
  posts?: Post[];
  post?: Post;
  title?: string;
  image?: string;
};

function Layout({ children }: Props) {
  const { theme } = useContext(UserContext);

  useEffect(() => {
    sendAnalyticsEvent("page_view");
  }, []);

  return (
    <div className={theme === "dark" ? globalClasses.darkBg : globalClasses.lightBg}>
      <MainNavigation />
      <div className={classes.container}>
        <main>{children}</main>
      </div>
      <footer
        className={`${classes.footer} ${
          theme === "dark" ? globalClasses.navDarkBg : globalClasses.navLightBg
        }`}
      >
        <Link href="/" className={globalClasses.flex}>
          <span style={{ fontSize: "2rem", margin: "auto 2px", marginTop: "-2px" }}>
            &copy;
          </span>
          <span className="text-2xl">CodePill</span>
          <p className={globalClasses.date}>{new Date().getFullYear()}</p>
        </Link>
      </footer>
    </div>
  );
}

export default Layout;
