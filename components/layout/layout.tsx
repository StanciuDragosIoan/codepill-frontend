import MainNavigation from "./navigation/main-navigation";
import classes from "./layout.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/user";

export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function Layout({ children }: Props) {
  const { theme } = useContext(UserContext);

  return (
    <div className={theme === "dark" ? classes.dark : classes.light}>
      <MainNavigation />
      <div className={classes.container}>
        <main>{children}</main>{" "}
      </div>
    </div>
  );
}

export default Layout;
