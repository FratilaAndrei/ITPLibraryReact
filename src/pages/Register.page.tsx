import Auth from "../containers/Auth";
import PageTemplate from "../containers/PageTemplate";

const Register = () => {
  return (
    <PageTemplate>
      <Auth formType="Register" />
    </PageTemplate>
  );
};

export default Register;
