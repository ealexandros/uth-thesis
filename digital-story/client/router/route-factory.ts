const dashboardPrefix = "/dashboard";

export const RouteFactory = {
  Index: "/",
  Dashboard: {
    Index: dashboardPrefix,
    Connections: `${dashboardPrefix}/connections`,
    Credentials: `${dashboardPrefix}/credentials`,
  },
};
