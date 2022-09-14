import { expect } from "@jest/globals";

import { render } from "@testing-library/react";
import Invite from "../../pages/invite";
import { NextPage } from "next";
import { useFetchConnectionQuery } from "../../api/fetchInvitation";

jest.mock("../../hocs/withAuth", () =>
  jest.fn((Page: NextPage) => {
    return (props: any) => <Page {...props} />;
  })
);

jest.mock("../../api/fetchInvitation");
const mockedFetchConnection = useFetchConnectionQuery as jest.Mock<any>;

describe("Invite", () => {
  beforeEach(() => {
    mockedFetchConnection.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(<Invite />);
  });

  it("renders with spinner", () => {
    mockedFetchConnection.mockImplementation(() => ({ isLoading: true }));

    const { getAllByTestId } = render(<Invite />);
    expect(getAllByTestId("loader")).toBeTruthy();
  });

  it("should display the invitationUrl", () => {
    const invitationUrl = "testing123";
    mockedFetchConnection.mockImplementation(() => ({
      data: { invitationUrl },
    }));

    const wrapper = render(<Invite />);
    expect(wrapper.getAllByText(invitationUrl)).toBeTruthy();
  });
});

export {};
