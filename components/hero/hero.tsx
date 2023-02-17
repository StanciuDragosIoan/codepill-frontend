import { UserContext } from "@/context/user";
import Image from "next/image";
import { useContext } from "react";
import classes from "./hero.module.css";

function Hero() {
  const { theme } = useContext(UserContext);

  console.log(theme);
  return (
    <section
      className={theme === "dark" ? classes.heroDark : classes.heroLight}
    >
      <div className={classes.image}>
        <Image
          src="/assets/img/code.jpg"
          alt="an imave showing Max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Dragos</h1>
      <p>
        I am a full-stack and mobile developer that blogs about web and mobile
        technolgies!
      </p>
      <p>Have a look around and see if you like anything!</p>
    </section>
  );
}

export default Hero;
