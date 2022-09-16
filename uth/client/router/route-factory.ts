const dashboardPrefix = "/dashboard";

export const RouteFactory = {
  SignIn: "/signin",
  Connection: "/connection",
  Dashboard: {
    Index: dashboardPrefix,
    Connections: `${dashboardPrefix}/connections`,
    Credentials: `${dashboardPrefix}/credentials`,
  },
};
