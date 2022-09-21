import { Empty, message } from "antd";
import { useFetchConnectionsQuery } from "api/connections/fetchConnections";
import {
  PresentationResponse,
  useFetchPresentationQuery,
} from "api/presentations/fetchPresentations";
import { useVerifyPresentationMutation } from "api/presentations/verifyPresentation";
import { Button } from "components/Elements/Button";
import { Spinner } from "components/Elements/Spinner";
import { Text } from "components/Form/Text";
import { DashboardLayout } from "components/Layouts/DashboardLayout";
import { PresentationLayout } from "components/Layouts/PresentationLayout";
import { Table, TBCell, TBody, THCell, THead, TRow } from "components/Table";
import { Form, Formik, FormikHelpers } from "formik";
import { queryClient } from "lib/react-query";
import Head from "next/head";
import { AiOutlinePlus } from "react-icons/ai";
import { RiTruckLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { NextPageWithLayout } from "types";

const StateComponent = (state: string) => {
  switch (state) {
    case "request_sent":
      return (
        <>
          <RiTruckLine size="2em" className="m-auto text-gray-400" />
          <span>Request Sent</span>
        </>
      );
    default:
      return (
        <>
          <RiTruckLine size="2em" className="m-auto text-gray-400" />
          <span>Request Sent</span>
        </>
      );
  }
};

const TableRows = ({
  presentation,
  index,
}: {
  presentation: PresentationResponse;
  index: number;
}) => (
  <TRow
    className={twMerge("cursor-default", index % 2 === 0 && "bg-[#00000020]")}
  >
    <TBCell className="py-6">{presentation.label}</TBCell>
    <TBCell className="py-6 whitespace-pre-line capitalize">
      {presentation.requested_attrs?.join("\n") || "-/-"}
    </TBCell>
    <TBCell className="py-6 capitalize">
      {presentation.state.replace("_", " ")}
    </TBCell>
  </TRow>
);

const Verifier: NextPageWithLayout = () => {
  const connections = useFetchConnectionsQuery();
  const presentations = useFetchPresentationQuery("verifier");

  const verifyMutation = useVerifyPresentationMutation({
    onSuccess() {
      message.success("Request send successfully.");
    },
    onError() {
      message.error("Something went wrong.");
    },
  });

  const initialValues = {
    conn_id: "",
    attrs: "",
    issuer_id: "",
    schema_id: "",
  };

  const onSubmit = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    verifyMutation.mutate({
      ...values,
      attrs: values.attrs.split(", "),
    });

    if (verifyMutation.isSuccess) {
      actions.resetForm();
      queryClient.refetchQueries("presentations");
    }
    actions.setSubmitting(false);
  };

  if (presentations.isLoading) {
    return <Spinner position="center" />;
  }

  return (
    <div className="font-light pb-4">
      <Head>
        <title>Digital Story - Presentations Verifier</title>
      </Head>

      <section className="p-12 md:px-16 md:py-12 bg-dark-overlay rounded-lg space-y-12">
        <h3 className="flex items-center md:space-x-2 text-light text-lg md:text-xl opacity-95">
          <AiOutlinePlus size="1.2em" className="hidden md:block" />
          <span>Request Presentation</span>
        </h3>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, getFieldProps }) => (
            <Form className="space-y-8 lg:space-y-4">
              <div className="grid grid-cols-1 gap-y-8 lg:gap-y-0 md:gap-x-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="w-full border-b-2 border-dark pb-2">
                  <select
                    placeholder="Connection Id"
                    className="bg-transparent w-full outline-none invalid:opacity-60"
                    {...getFieldProps("conn_id")}
                    required
                  >
                    <option value="" disabled hidden>
                      Connection Id
                    </option>
                    {connections.data?.map((connection, index) => (
                      <option key={index} value={connection.connection_id}>
                        {connection.alias}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full relative">
                  <Text
                    className="w-full"
                    placeholder="Attributes"
                    {...getFieldProps("attrs")}
                    required
                  />
                  <span className="absolute left-0 opacity-40 -bottom-4 text-2xs whitespace-nowrap lg:text-xs lg:-bottom-5">
                    e.x. name, dob..
                  </span>
                </div>

                <Text
                  placeholder="Issuer Id"
                  {...getFieldProps("issuer_id")}
                  required
                />
                <Text
                  placeholder="Schema Id"
                  {...getFieldProps("schema_id")}
                  required
                />
              </div>

              <Button
                type="submit"
                className="py-1.5 shadow-sm"
                disabled={isSubmitting}
              >
                Request
              </Button>
            </Form>
          )}
        </Formik>
      </section>

      <section className="w-full bg-dark-overlay rounded-lg my-8">
        {presentations.data?.length ? (
          <div className="w-full h-full">
            <Table>
              <THead>
                <TRow>
                  <THCell>Name</THCell>
                  <THCell>Attributes</THCell>
                  <THCell>State</THCell>
                </TRow>
              </THead>
              <TBody>
                {presentations.data?.map((presentation, index) => (
                  <TableRows
                    key={index}
                    presentation={presentation}
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

Verifier.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <PresentationLayout>{page}</PresentationLayout>
    </DashboardLayout>
  );
};

export default Verifier;
