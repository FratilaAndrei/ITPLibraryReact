import { FC } from "react";
import AuthPicture from "../assets/images/auth.png";
import LoginForm from "../components/Auth/LoginForm";
import SignUpForm from "../components/Auth/SignUpForm";
import RegisterProvider from "../contexts/RegisterProvider";
type Props = {
  orderDetailsModel: "Login" | "Register";
};

const Auth: FC<Props> = ({ orderDetailsModel }) => {
  return (
    <div className=" md:flex h-[65%] w-4/5 mx-auto">
      <div className="mb-4 md:mb-0 fullHd:h-[85%] fullHd:w-1/2">
        <img
          src={AuthPicture}
          alt="Auth Image"
          className="h-full xl:h-[90%] w-[70%] md:w-[90%] xl:w-full object-contain mx-auto fullHd:h-[90%] fullHd:w-[90%]"
        />
      </div>
      <RegisterProvider>
        {orderDetailsModel === "Login" ? <LoginForm /> : <SignUpForm />}
      </RegisterProvider>
    </div>
  );
};

export default Auth;
