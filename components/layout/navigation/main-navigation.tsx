import Link from "next/link";
import classes from "./main-navigation.module.css";
import Logo from "../logo/logo";
import { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "@/context/user";
function MainNavigation() {
  const { theme, setTheme } = useContext(UserContext);
  // const [checked, setChecked] = useState(false);
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
      // setChecked(true);
    }
    setTheme(theme);
    // theme === "dark" ? setChecked(true) : setChecked(false);
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
    </>
  );
}

export default MainNavigation;
