import { UserContext } from "@/context/user";
import Image from "next/image";
import { useContext } from "react";
import classes from "./hero.module.css";

function Hero() {
  const { theme } = useContext(UserContext);

  return (
    <section
      className={theme === "dark" ? classes.heroDark : classes.heroLight}
    >
      <h1 className={classes.heroHeader}>Welcome to CodePill!</h1>
      <div className={classes.flex}>
        <div className={classes.flexChild}>
          <p className={`${classes.heroText} ${classes.lg}`}>
            Where awesome codeSnippets build amazing projects!
          </p>
          <p className={classes.heroText}>
            Unlock the secrets of web development technologies and embark on
            your journey to create remarkable projects, whether they&apos; re
            small and impactful or large-scale innovations. Start your coding
            adventure today!
          </p>
        </div>
        <div className={classes.flexChild}>
          <Image
            className={classes.image}
            src="/assets/img/background-app.jpeg"
            alt="an image showing an app being built"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
