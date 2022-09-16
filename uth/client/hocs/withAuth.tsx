import { NextPage } from "next";
import { RouteFactory } from "../router/route-factory";
import { useIsAuthenticated } from "../contexts/authentication";
import { isBrowser } from "../utils/window";

const withAuth = <T,>(
  Page: NextPage<T>,
  location: string = RouteFactory.SignIn
): NextPage<T> => {
  return (props: any) => {
    const isAuth = useIsAuthenticated();

    if (isBrowser()) {
      if (!isAuth) {
        window.location.assign(location);
        return null;
      }

      return isAuth ? <Page {...props} /> : null;
    }
    return null;
  };
};

export default withAuth;
