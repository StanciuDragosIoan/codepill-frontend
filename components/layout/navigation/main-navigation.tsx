import Link from "next/link";
import classes from "./main-navigation.module.css";
import Logo from "../logo/logo";
import { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "@/context/user";
import Image from "next/image";
function MainNavigation() {
  const { theme, setTheme } = useContext(UserContext);
  const [isShow, setShow] = useState(true);

  const darkPlaceholder = "/assets/img/saber.png";
  const lightPlaceholder = "/assets/img/mordred.png";
  const checked = useMemo(() => (theme === "dark" ? true : false), [theme]);

  const swapThemes = () => {
    if (theme === "dark") {
      setTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
    }
    if (typeof window !== "undefined") {
      let themeToSave;
      theme === "dark" ? (themeToSave = "light") : (themeToSave = "dark");
      localStorage.setItem("codePillTheme", JSON.stringify(themeToSave));
    }
  };

  useEffect(() => {
    const isStore = localStorage.getItem("codePillTheme");
    let theme;
    if (isStore) {
      theme = JSON.parse(isStore);
    } else {
      theme = "light";
    }
    setTheme(theme);
  }, [theme, checked]);

  return (
    <>
      <header
        className={`${classes.header} ${
          theme === "dark" ? classes.darkBg : classes.lightBg
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
              <Link href="/about">About</Link>
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
      {isShow && (
        <div className={classes.placeholder}>
          <Image
            src={theme === "dark" ? darkPlaceholder : lightPlaceholder}
            alt={theme === "dark" ? "dark_mode_picture" : "light_mode_picture"}
            width={150}
            height={150}
            priority={true}
            onDoubleClick={() => {
              console.log("te fut");
              setShow(false);
            }}
          />
          <span className={classes.tooltip}>
            Double Click to make me go away (｡•́︿•̀｡)
          </span>
        </div>
      )}
    </>
  );
}

export default MainNavigation;
