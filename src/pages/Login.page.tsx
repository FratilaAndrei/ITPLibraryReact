import Auth from "../containers/Auth";
import PageTemplate from "../containers/PageTemplate";

const Login = () => {
  return (
    <PageTemplate>
      <Auth orderDetailsModel="Login" />
    </PageTemplate>
  );
};

export default Login;
