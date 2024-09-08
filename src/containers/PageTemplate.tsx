import { FC, PropsWithChildren } from "react";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";

type Props = {
  className?: string;
  hasFooterIcon?: boolean;
};

const PageTemplate: FC<Props & PropsWithChildren> = ({
  children,
  className,
  hasFooterIcon,
}) => {
  return (
    <div className={`${className} flex flex-col justify-between h-screen`}>
      <Navbar />
      <div className="h-[56px] fullHd:h-[72px]" />
      {children}
      <Footer hasIcon={hasFooterIcon} />
    </div>
  );
};

export default PageTemplate;
