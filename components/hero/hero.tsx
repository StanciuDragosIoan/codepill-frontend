import { UserContext } from "@/context/user";
import { useContext } from "react";
import classes from "./hero.module.css";
import { VideoComponent } from "../utils/VideoComponent";
import globalClasses from "@/styles/shared.module.css";
const { heroDark, heroLight } = classes;
const { card } = globalClasses;
function Hero() {
  const { theme } = useContext(UserContext);

  return (
    <section className={`${card} ${theme === "dark" ? heroDark : heroLight}`}>
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
          <VideoComponent />
        </div>
      </div>
    </section>
  );
}

export default Hero;
