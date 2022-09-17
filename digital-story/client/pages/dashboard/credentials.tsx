import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";

const Credentials: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Digital Story - Credentials</title>
      </Head>

      <div className="h-full flex flex-col space-y-8">
        <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
          Credentials
        </h1>
      </div>
    </>
  );
};

Credentials.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Credentials;
