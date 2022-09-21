const dashboardPrefix = "/dashboard";

export const RouteFactory = {
  Index: "/",
  Dashboard: {
    Index: dashboardPrefix,
    Connections: `${dashboardPrefix}/connections`,
    Credentials: `${dashboardPrefix}/credentials`,
    Presentations: {
      Index: `${dashboardPrefix}/presentations`,
      Verifier: `${dashboardPrefix}/presentations/verifier`,
      Prover: `${dashboardPrefix}/presentations/prover`,
    },
  },
};
