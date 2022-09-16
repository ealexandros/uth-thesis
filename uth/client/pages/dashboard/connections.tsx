import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";

import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";

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
    key={index}
    className={twMerge("cursor-default", index % 2 === 0 && "bg-[#00000020]")}
  >
    <TBCell className="sm:w-full">{index + 1}</TBCell>
    <TBCell className="sm:w-full">{connection.username}</TBCell>
    <TBCell className="w-full hidden lg:block" title={connection.connection_id}>
      <div className="truncate text-center m-auto">
        {connection.connection_id}
      </div>
    </TBCell>
    <TBCell className="sm:w-full" title="click to add credential">
      {connection.active ? (
        <div className="flex space-x-2 justify-center">
          <BsCheckCircleFill size="1.5em" className="text-green-700" />
          <a
            className="opacity-20"
            href={`${RouteFactory.Dashboard.Credentials}?connection_id=${connection.connection_id}`}
            title="click to add credentials"
          >
            <FaLongArrowAltRight
              size="1.5em"
              className="text-white cursor-pointer"
            />
          </a>
        </div>
      ) : (
        <AiFillCloseCircle size="1.7em" className="text-dark-accent m-auto" />
      )}
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
                  <THCell className="lg:w-2/12">No.</THCell>
                  <THCell className="lg:w-3/12">Name</THCell>
                  <THCell className="lg:w-3/12 hidden lg:table-cell">
                    Connection Id
                  </THCell>
                  <THCell className="lg:w-4/12">Status</THCell>
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
