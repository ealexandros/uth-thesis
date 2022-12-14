import { DashboardLayout } from "components/Layouts/DashboardLayout";
import Head from "next/head";
import Link from "next/link";
import { BsFillPinFill, BsPlusLg } from "react-icons/bs";
import { TbCertificate, TbPlugConnected } from "react-icons/tb";
import { RouteFactory } from "router/route-factory";
import { NextPageWithLayout } from "types";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Digital Story - Dashboard</title>
      </Head>
      <div className="font-light">
        <h1 className="text-4xl text-white">Dashboard</h1>

        <div className="flex items-center my-12 space-x-2 border-b pb-3 w-full sm:w-1/2 lg:w-2/6">
          <BsFillPinFill size="1.3em" className="text-primary" />
          <h4 className="text-white text-xl">Pinned Application</h4>
        </div>

        <div className="grid grid-cols-2 justify-items-center gap-y-8 sm:flex sm:space-x-8">
          <Link href={RouteFactory.Dashboard.Connections}>
            <div className="w-32 h-32 rounded-lg shadow-lg cursor-pointer bg-dark-overlay flex flex-col justify-center items-center space-y-6 lg:w-40 lg:h-40">
              <TbPlugConnected size="4em" />
              <span>Connections</span>
            </div>
          </Link>

          <Link href={RouteFactory.Dashboard.Credentials}>
            <div className="w-32 h-32 rounded-lg shadow-lg cursor-pointer bg-dark-overlay flex flex-col justify-center items-center space-y-6 lg:w-40 lg:h-40">
              <TbCertificate size="4em" />
              <span>Credentials</span>
            </div>
          </Link>

          <div className="w-32 h-32 rounded-lg cursor-pointer border-8 border-dashed border-dark-overlay flex items-center justify-center lg:w-40 lg:h-40">
            <BsPlusLg size="1.5em" className="opacity-25" />
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
