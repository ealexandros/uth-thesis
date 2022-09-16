import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";
import { BsFillPinFill, BsPlusLg } from "react-icons/bs";
import { TbPlugConnected, TbCertificate } from "react-icons/tb";
import { RouteFactory } from "../../router/route-factory";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>University of Thessaly - Dashboard</title>
      </Head>
      <div className="font-light">
        <h1 className="text-4xl text-white">Dashboard</h1>

        <div className="flex items-center my-12 space-x-2 border-b pb-3 w-full sm:w-1/2 lg:w-2/6">
          <BsFillPinFill size="1.3em" className="text-dark-accent" />
          <h4 className="text-white text-xl">Pinned Application</h4>
        </div>

        <div className="grid grid-cols-2 justify-items-center gap-y-8 sm:flex sm:space-x-8">
          <a
            href={RouteFactory.Dashboard.Connections}
            className="w-32 h-32 rounded-lg shadow-lg cursor-pointer bg-dark-overlay flex flex-col justify-center items-center space-y-6 lg:w-40 lg:h-40"
          >
            <TbPlugConnected size="4em" />
            <span>Connections</span>
          </a>
          <a className="w-32 h-32 rounded-lg shadow-lg cursor-pointer bg-dark-overlay flex flex-col justify-center items-center space-y-6 lg:w-40 lg:h-40">
            <TbCertificate size="4em" />
            <span>Certificates</span>
          </a>
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
