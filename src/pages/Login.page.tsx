import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";

const Login = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      <Footer />
    </div>
  );
};

export default Login;
