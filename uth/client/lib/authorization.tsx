import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsAuthenticated } from "../contexts/authentication";
import { RouteFactory } from "../router/route-factory";

type AuthorizationProps = {
  mustAuth?: boolean;
  children: React.ReactElement | React.ReactElement[];
};

export const Authorization = ({
  mustAuth = true,
  children,
}: AuthorizationProps) => {
  const router = useRouter();
  const isAuth = useIsAuthenticated();

  useEffect(() => {
    if (mustAuth && !isAuth) {
      router.push(RouteFactory.SignIn);
    }
  });

  return mustAuth && !isAuth ? null : <>{children}</>;
};
