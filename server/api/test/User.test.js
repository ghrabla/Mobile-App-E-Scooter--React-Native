const user = require("../controller/userController");

describe("User Controller", () => {
  test("Get users", () => {
    expect(user.getUsers()).toBeTruthy();
  });
  test("Get users", () => {
    expect(typeof user).toBe('object');
  });
});
