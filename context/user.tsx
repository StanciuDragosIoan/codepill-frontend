import { createContext, useEffect, useState } from "react";

interface UserContextType {
  theme: String;
  setTheme: Function;
}

export const UserContext = createContext<UserContextType>({
  theme: "",
  setTheme: () => true,
});

type Props = {
  children: string | JSX.Element | JSX.Element[];
  themeProp?: string;
};

export const UserContextProvider = (props: Props) => {
  const { children, themeProp } = props;
  const [theme, setTheme] = useState(themeProp ? themeProp : "dark");

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
