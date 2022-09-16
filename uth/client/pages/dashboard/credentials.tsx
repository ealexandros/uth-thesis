import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useFetchConnectionsQuery } from "../../api/dashboard/fetchConnections";
import { Spinner } from "../../components/Elements/Spinner";
import { useRouter } from "next/router";
import { useCreateDegreeCredential } from "../../api/dashboard/createDegreeCredential";
import { message } from "antd";

const Credentials: NextPageWithLayout = () => {
  const router = useRouter();

  const { mutate } = useCreateDegreeCredential({
    onSuccess() {
      message.success("Credential was provided.");
    },
    onError() {
      message.error("Credential was not provided.");
    },
  });
  const { data, isLoading } = useFetchConnectionsQuery();

  const [connectionId, setConnectionId] = useState<string>("");

  useEffect(() => {
    const { connection_id } = router.query;
    const unwrapConnectionId =
      connection_id && !Array.isArray(connection_id) ? connection_id : "";

    data?.some((el) => el.connection_id === unwrapConnectionId) &&
      setConnectionId(unwrapConnectionId);
  });

  const appendDegreeCredential = () => {
    if (!connectionId) {
      message.warning("Select a connection.");
      return;
    }
    mutate(connectionId);
  };

  if (isLoading) {
    return <Spinner wrapperClassName="bg-dark" />;
  }

  return (
    <>
      <Head>
        <title>University of Thessaly - Credentials</title>
      </Head>
      <section className="h-full flex flex-col">
        <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
          Credentials
        </h1>

        <div className="flex-1 w-full my-12 space-y-12 sm:space-y-0 sm:flex">
          <div className="rounded-lg bg-dark-overlay flex flex-col items-center justify-center py-8 space-y-4 sm:py-0 sm:space-y-20 sm:w-5/12 sm:h-full">
            <div className="opacity-80 flex space-x-2 sm:space-x-0 sm:space-y-4 items-center sm:flex-col">
              <BsPersonCircle className="sm:m-auto sm:w-3/6 sm:h-3/6 lg:w-5/6 lg:h-5/6" />
              <h4 className="text-white font-light capitalize text-md">
                select connection
              </h4>
            </div>

            <select
              className="w-4/6 py-2 outline-none bg-transparent border-b border-dark-accent text-[#ffffffc0]"
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
            >
              <option disabled={true} value="">
                Choose an Option..
              </option>
              {data?.map((connection, index) => (
                <option key={index} value={connection.connection_id}>
                  {connection.username}
                </option>
              ))}
            </select>
          </div>

          <div className="w-2/12 hidden items-center justify-center sm:flex">
            <FaLongArrowAltRight size="4.5em" className="text-dark-overlay" />
          </div>

          <div className="rounded-lg bg-dark-overlay flex flex-col items-center justify-center py-8 space-y-4 sm:py-0 sm:space-y-20 sm:w-5/12 sm:h-full">
            <div className="opacity-80 flex space-x-2 sm:space-x-0 sm:space-y-4 items-center sm:flex-col">
              <TbCertificate className="sm:m-auto sm:w-3/6 sm:h-3/6 lg:w-5/6 lg:h-5/6" />
              <h4 className="text-white font-light capitalize text-md">
                issue credential
              </h4>
            </div>

            <div className="flex sm:flex-col w-full space-x-4 sm:space-x-0 sm:space-y-4 items-center justify-center">
              <button
                className="text-white bg-dark-accent rounded-lg px-2 sm:px-0 sm:w-1/2 py-2 hover:shadow-md"
                onClick={appendDegreeCredential}
              >
                Graduated
              </button>
              <button className="text-white bg-dark rounded-lg px-4 sm:px-0 sm:w-1/2 py-2 hover:shadow-md">
                Other
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Credentials.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Credentials;
