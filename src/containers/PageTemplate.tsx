import { FC, PropsWithChildren } from "react";
import Footer from "../common/components/Footer/Footer";
import Navbar from "../common/components/Navbar/Navbar";

type Props = {
  className?: string;
  hasFooterIcon: boolean;
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
