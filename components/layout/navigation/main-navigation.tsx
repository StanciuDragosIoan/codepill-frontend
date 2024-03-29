import Link from "next/link";
import classes from "./main-navigation.module.css";
import globalClasses from "@/styles/shared.module.css";
import Logo from "../logo/logo";
import { useContext, useState, useMemo } from "react";
import { UserContext } from "@/context/user";
import Image from "next/image";
function MainNavigation() {
  const { theme, setTheme } = useContext(UserContext);
  const [isShow, setShow] = useState(true);

  const darkPlaceholder = "/assets/img/saber.png";
  const lightPlaceholder = "/assets/img/mordred.png";
  const checked = useMemo(() => (theme === "dark" ? true : false), [theme]);

  const swapThemes = () => {
    setShow(true);
    if (theme === "dark") {
      setTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
    }
    if (typeof window !== "undefined") {
      let themeToSave;
      theme === "dark" ? (themeToSave = "light") : (themeToSave = "dark");
      const persistentCookie = `codePillTheme=${themeToSave}; path=/; max-age=2628000`;
      document.cookie = persistentCookie;
    }
  };

  return (
    <>
      <header
        className={`${classes.header} ${
          theme === "dark" ? globalClasses.navDarkBg : globalClasses.navLightBg
        }`}
      >
        <Link href="/">
          <Logo />
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <input
                className={classes.input}
                type="checkbox"
                id="darkmode-toggle"
                onChange={swapThemes}
                checked={checked}
              />
              <label
                className={classes.label}
                htmlFor="darkmode-toggle"
              ></label>
              <div className={classes.background} />
            </li>
          </ul>
        </nav>
      </header>

      <div
        className={classes.placeholder}
        key={Math.random()}
        style={{ opacity: Number(isShow) }}
      >
        <Image
          src={theme === "dark" ? darkPlaceholder : lightPlaceholder}
          alt={theme === "dark" ? "dark_mode_picture" : "light_mode_picture"}
          width={150}
          height={150}
          priority={true}
          onDoubleClick={() => setShow(false)}
        />
        <span className={classes.tooltip}>
          Double Click to make me go away (｡•́︿•̀｡)
        </span>
      </div>
    </>
  );
}

export default MainNavigation;
