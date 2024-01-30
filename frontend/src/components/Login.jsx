//path="/sign-in"
import AuthPage from "./AuthPage";

export default function Login({
  onSubmit,
  handleChangeInput,
  email,
  password,
}) {
  return (
    <AuthPage
      name="login"
      titleText="Вход"
      buttonText="Войти"
      onSubmit={onSubmit}
      handleChangeInput={handleChangeInput}
      email={email}
      password={password}
    />
  );
}
