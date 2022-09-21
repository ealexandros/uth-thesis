import { Empty, message } from "antd";
import { useDeleteProofPresentation } from "api/presentations/deleteProofPresentation";
import {
  PresentationResponse,
  useFetchPresentationQuery,
} from "api/presentations/fetchPresentations";
import { useProverPresentationMutation } from "api/presentations/proverPresentation";
import { Spinner } from "components/Elements/Spinner";
import { DashboardLayout } from "components/Layouts/DashboardLayout";
import { PresentationLayout } from "components/Layouts/PresentationLayout";
import { Table, TBCell, TBody, THCell, THead, TRow } from "components/Table";
import Head from "next/head";
import { useMemo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { UseMutateFunction } from "react-query";
import { twMerge } from "tailwind-merge";
import { NextPageWithLayout } from "types";

const TableRows = ({
  presentation,
  accept,
  decline,
  index,
}: {
  presentation: PresentationResponse;
  accept: UseMutateFunction<void, any, any, unknown>;
  decline: UseMutateFunction<void, any, any, unknown>;
  index: number;
}) => (
  <TRow
    className={twMerge("cursor-default", index % 2 === 0 && "bg-[#00000020]")}
  >
    <TBCell className="py-6">{presentation.label}</TBCell>
    <TBCell className="py-6 leading-6 whitespace-pre-line capitalize">
      {presentation.requested_attrs?.join("\n")}
    </TBCell>
    <TBCell className="py-6">
      <div className="space-y-2 flex flex-col items-center lg:flex-row lg:space-x-4 lg:space-y-0 lg:justify-center">
        <button
          className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-all"
          onClick={() => accept(presentation.presentation_exchange_id)}
        >
          <BsCheckCircleFill size="1em" className="text-green-600" />
          <span>Accept</span>
        </button>
        <button
          className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-all"
          onClick={() => decline(presentation.presentation_exchange_id)}
        >
          <AiFillCloseCircle size="1.2em" className="text-red-600" />
          <span>Decline</span>
        </button>
      </div>
    </TBCell>
  </TRow>
);

const Prover: NextPageWithLayout = () => {
  const presentations = useFetchPresentationQuery("prover");

  const declineProof = useDeleteProofPresentation({
    onSuccess() {
      message.success("Successful.");
    },
    onError(error) {
      message.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const acceptProof = useProverPresentationMutation({
    onSuccess() {
      message.success("Successful.");
    },
    onError(error) {
      message.error(error?.response?.data?.message || "Something went wrong.");
    },
  });

  const proverData = useMemo<PresentationResponse[]>(
    () =>
      presentations.data?.filter(
        (presentation) => presentation.state === "request_received"
      ) || [],
    [presentations.data]
  );

  if (presentations.isLoading) {
    return <Spinner position="center" />;
  }

  return (
    <div className="font-light">
      <Head>
        <title>Digital Story - Presentations Prover</title>
      </Head>

      <div className="text-xs text-right opacity-20">
        * You can see all outgoing credential request you have.
      </div>

      <section className="w-full bg-dark-overlay rounded-lg my-4">
        {proverData.length ? (
          <div className="w-full h-full">
            <Table>
              <THead>
                <TRow>
                  <THCell>Name</THCell>
                  <THCell>Attributes</THCell>
                  <THCell>Action</THCell>
                </TRow>
              </THead>
              <TBody>
                {proverData.map((presentation, index) => (
                  <TableRows
                    presentation={presentation}
                    accept={acceptProof.mutate}
                    decline={declineProof.mutate}
                    key={index}
                    index={index}
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
  );
};

Prover.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <PresentationLayout>{page}</PresentationLayout>
    </DashboardLayout>
  );
};

export default Prover;
