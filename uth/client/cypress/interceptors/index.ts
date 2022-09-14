const API_BASE_URL = "http://localhost:4000";

export const interceptors = {
  signin: (username: string = "alice") => {
    return cy
      .intercept("POST", `${API_BASE_URL}/login`, (req) => {
        const { body } = req;

        if (body.username === undefined || body.username !== username) {
          req.reply(401, { message: "Unauthorized" });
          return;
        }
        req.reply(200);
      })
      .as("signin");
  },
  invite: () => {
    return cy
      .intercept("POST", `${API_BASE_URL}/connections/invitation`, {
        invitationUrl: "testing123",
      })
      .as("invite");
  },
};
