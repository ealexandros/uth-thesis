import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import {
  Table,
  TBCell,
  TBody,
  THCell,
  THead,
  TRow,
} from "../../components/Table";
import { RouteFactory } from "../../router/route-factory";
import {
  ConnectionsResponse,
  useFetchConnectionsQuery,
} from "../../api/dashboard/fetchConnections";
import { Spinner } from "../../components/Elements/Spinner";
import { twMerge } from "tailwind-merge";

const TableRows = ({
  index,
  connection,
}: {
  index: number;
  connection: ConnectionsResponse;
}) => (
  <TRow
    className={twMerge("cursor-default", index % 2 === 0 && "bg-[#00000020]")}
  >
    <TBCell className="sm:w-full">{index}</TBCell>
    <TBCell className="sm:w-full">{connection.username}</TBCell>
    <TBCell className="w-full hidden lg:block" title={connection.connection_id}>
      <div className="truncate text-center m-auto">
        {connection.connection_id}
      </div>
    </TBCell>
    <TBCell className="sm:w-full">
      <a
        href={`${RouteFactory.Dashboard.Credentials}?connection_id=${connection.connection_id}`}
      >
        <BsFillArrowRightCircleFill
          size="1.5em"
          className="text-dark-accent cursor-pointer m-auto"
        />
      </a>
    </TBCell>
  </TRow>
);

const Connections: NextPageWithLayout = () => {
  const { data, isLoading } = useFetchConnectionsQuery();

  if (isLoading) {
    return <Spinner wrapperClassName="bg-dark" />;
  }

  return (
    <>
      <Head>
        <title>University of Thessaly - Connections</title>
      </Head>
      <section className="h-full flex flex-col">
        <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
          Connections
        </h1>

        <div className="flex-1 w-full bg-dark-overlay rounded-lg my-12">
          <div className={twMerge("w-full h-full", !data?.length && "hidden")}>
            <Table>
              <THead>
                <TRow>
                  <THCell className="lg:w-2/12">Id</THCell>
                  <THCell className="lg:w-3/12">Name</THCell>
                  <THCell className="lg:w-3/12 hidden lg:table-cell">
                    Connection
                  </THCell>
                  <THCell className="lg:w-4/12">Credentials</THCell>
                </TRow>
              </THead>
              <TBody>
                {data?.map((connection, index) => (
                  <TableRows index={index} connection={connection} />
                ))}
              </TBody>
            </Table>
          </div>

          {!data?.length && (
            <div className="text-white w-full h-full flex items-center justify-center opacity-40 text-xs underline cursor-default">
              There are no connection made yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
};

Connections.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Connections;
