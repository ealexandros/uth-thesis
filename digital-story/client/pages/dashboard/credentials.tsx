import { useFetchCredentialsQuery } from "api/credentials/fetchCredentials";
import { Spinner } from "components/Elements/Spinner";
import { DashboardLayout } from "components/Layouts/DashboardLayout";
import Head from "next/head";
import { NextPageWithLayout } from "types";

import { Empty } from "antd";
import { Table, TBCell, TBody, THCell, THead, TRow } from "components/Table";
import { twMerge } from "tailwind-merge";

const Credentials: NextPageWithLayout = () => {
  const { data, isLoading } = useFetchCredentialsQuery();

  if (isLoading) {
    return <Spinner position="center" />;
  }

  return (
    <>
      <Head>
        <title>Digital Story - Credentials</title>
      </Head>

      <div className="h-full flex flex-col space-y-8">
        <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
          Credentials
        </h1>

        <div className="w-full bg-dark-overlay rounded-lg my-12">
          {data && Object.keys(data).length ? (
            <div className="w-full h-full">
              <Table>
                <THead>
                  <TRow>
                    <THCell>Name</THCell>
                    <THCell>Value</THCell>
                  </TRow>
                </THead>
                <TBody>
                  {Object.entries(data).map(([key, value], index) => (
                    <TRow
                      key={index}
                      className={twMerge(
                        "cursor-default capitalize",
                        index % 2 === 0 && "bg-[#00000020]"
                      )}
                    >
                      <TBCell className="py-6 px-4 md:px-12 sm:w-full">
                        {key}
                      </TBCell>
                      <TBCell className="px-4 md:px-12 sm:w-full">
                        {value}
                      </TBCell>
                    </TRow>
                  ))}
                </TBody>
              </Table>
            </div>
          ) : (
            <div className="opacity-60 py-10">
              <Empty description="No Credentials" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Credentials.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Credentials;
