import classes from "./logo.module.css";
import Image from "next/image";

function Logo() {
  return (
    <div className={`${classes.logo} flex justify-center pt-1`}>
      <Image width={80} height={80} src="/logo.png" alt="codepill logo" />
    </div>
  );
}

export default Logo;
