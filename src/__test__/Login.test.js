import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test Login Component", () => {
  test("render form with 1 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    // console.log(buttonList);
    expect(buttonList).toHaveLength(1);
  });

  test("shuold be failed on email validation", () => {
    const testEmail = "hogehoge.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("shuold be successed on email validation", () => {
    const testEmail = "hogehoge@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("password input shuold have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should be able to submit the form", () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");
    userEvent.type(email, "hogehoge@gmail.com");
    userEvent.type(password, "hogemi");
    userEvent.click(submitButton);

    const userInfo = screen.getByText("hogehoge@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });
});
