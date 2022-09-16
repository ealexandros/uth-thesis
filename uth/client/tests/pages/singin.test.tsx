import { render } from "@testing-library/react";
import { useLoginMutation } from "../../api/misc/login";
import SignIn from "../../pages/signin";

jest.mock("../../api/login");
const mockedLogin = useLoginMutation as jest.Mock<any>;

describe("SignIn Page", () => {
  beforeEach(() => {
    mockedLogin.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render withou crashing", () => {
    render(<SignIn />);
  });
});

export {};
