import { useState } from "react";
import Head from "next/head";
import { DashboardLayout } from "../../components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "../../types";

import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdMail, MdOutlineQrCode, MdOutgoingMail } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { TbCapture } from "react-icons/tb";

import { useCreateConnectionMutation } from "../../api/connections/createConnection";
import { useReceiveConnectionMutation } from "../../api/connections/receiveConnection";

import {
  Table,
  TBCell,
  TBody,
  THCell,
  THead,
  TRow,
} from "../../components/Table";
import {
  ConnectionsResponse,
  useFetchConnectionsQuery,
} from "../../api/connections/fetchConnections";
import { Spinner } from "../../components/Elements/Spinner";
import { twMerge } from "tailwind-merge";

import { Empty, message, Modal } from "antd";
import { queryClient } from "../../lib/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../../components/Elements/Button";

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
    <TBCell className="sm:w-full">{connection.alias || "-/-"}</TBCell>
    <TBCell className="w-full hidden lg:block" title={connection.connection_id}>
      <div className="truncate text-center m-auto">
        {connection.connection_id}
      </div>
    </TBCell>
    <TBCell className="sm:w-full" title="click to add credential">
      {connection.active ? (
        <BsCheckCircleFill size="1.5em" className="text-green-700 m-auto" />
      ) : (
        <AiFillCloseCircle size="1.7em" className="text-dark-accent m-auto" />
      )}
    </TBCell>
  </TRow>
);

const Connections: NextPageWithLayout = () => {
  const connections = useFetchConnectionsQuery();

  const createConnection = useCreateConnectionMutation({
    onSuccess() {
      message.success("Connection Created.");
    },
    onError() {
      message.error("Connection was not created.");
    },
  });

  const receiveConnection = useReceiveConnectionMutation({
    onSuccess() {
      message.success("Connection Created.");
    },
    onError() {
      message.error("Connection was not created.");
    },
  });

  const [modal, setModal] = useState(false);
  const [creator, setCreator] = useState("");
  const [receiver, setReceiver] = useState("");

  const createConnectionBtn = async () => {
    const resp = await createConnection.mutateAsync(undefined);
    setCreator(resp["inv_url"]);

    queryClient.refetchQueries("connections");
  };

  const copyCreatorConnection = () => {
    navigator.clipboard.writeText(creator);
  };

  const receiveConnectionBtn = () => {
    if (!receiver) {
      message.warn("Connection Id is missing.");
      return;
    }

    receiveConnection.mutate(receiver);
    queryClient.refetchQueries("connections");
  };

  const openCreatorModal = () => {
    if (!creator) {
      message.warn("You need to generate a connection first.");
      return;
    }
    setModal(true);
  };

  if (connections.isLoading) {
    return <Spinner wrapperClassName="bg-dark" />;
  }

  return (
    <>
      <Head>
        <title>Digital Story - Connections</title>
      </Head>

      <Modal
        footer={false}
        centered={true}
        closable={false}
        width="17em"
        bodyStyle={{ backgroundColor: "", width: "10px" }}
        open={modal}
        onCancel={() => setModal(false)}
      >
        <QRCodeSVG value={creator} className="h-48 w-48 m-auto" />
      </Modal>

      <div className="h-full flex flex-col space-y-8">
        <h1 className="text-4xl text-white font-light border-b pb-4 w-full sm:w-1/2 lg:w-2/6">
          Connections
        </h1>

        <section className="w-full space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
          <div className="w-full h-64 rounded-md bg-dark-overlay">
            <div className="w-4/5 h-full flex flex-col justify-center m-auto pb-4 space-y-8">
              <div className="flex items-center space-x-4">
                <MdOutgoingMail size="2.5em" />
                <h1 className="capitalize text-2xl text-light font-light">
                  create connection
                </h1>
              </div>

              <div className="border-b-4 pb-2 border-dark flex justify-between">
                <input
                  type="text"
                  placeholder="Connection Id"
                  value={creator}
                  className="bg-transparent border-none placeholder:font-light w-full outline-none pr-8"
                  onChange={() => {}}
                />
                <button
                  className="cursor-pointer"
                  onClick={copyCreatorConnection}
                >
                  <BiCopy size="1.5em" className="opacity-80" />
                </button>
              </div>

              <div className="space-x-4 flex">
                <Button
                  className="font-light shadow-lg"
                  onClick={createConnectionBtn}
                  size="md"
                >
                  Generate
                </Button>

                <button onClick={openCreatorModal}>
                  <MdOutlineQrCode size="1.5em" className="opacity-80" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-64 rounded-md bg-dark-overlay">
            <div className="w-4/5 h-full flex flex-col justify-center m-auto pb-4 space-y-8">
              <div className="flex items-center space-x-4">
                <MdMail size="2.2em" />
                <h1 className="capitalize text-2xl text-light font-light">
                  receive invitation
                </h1>
              </div>

              <div className="border-b-4 pb-2 border-dark flex justify-between">
                <input
                  type="text"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder="Type the Connection Id.."
                  className="bg-transparent border-none placeholder:font-light w-full outline-none pr-8"
                />
              </div>

              <div className="space-x-4 flex">
                <Button
                  className="font-light shadow-lg"
                  onClick={receiveConnectionBtn}
                  size="md"
                >
                  Connect
                </Button>

                <button>
                  <TbCapture size="1.5em" className="opacity-80" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-dark-overlay rounded-lg my-8">
          {connections.data?.length ? (
            <div className="w-full h-full">
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
                  {connections.data?.map((connection, index) => (
                    <TableRows
                      key={index}
                      index={index}
                      connection={connection}
                    />
                  ))}
                </TBody>
              </Table>
            </div>
          ) : (
            <div className="opacity-60 py-10">
              <Empty />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

Connections.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Connections;
