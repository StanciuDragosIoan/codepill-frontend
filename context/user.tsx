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
};

export const UserContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState("light");

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
