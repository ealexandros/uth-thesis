import React, { useContext, useState } from "react";

type AuthContextProps = {
  user?: {
    username: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<
      | {
          username: string;
        }
      | undefined
    >
  >;
};

const AuthContext = React.createContext<AuthContextProps>({
  setUser: () => {},
});

type AuthProviderProps = {
  children: React.ReactElement;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextProps["user"]>(undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();

  return context.user !== undefined;
}
