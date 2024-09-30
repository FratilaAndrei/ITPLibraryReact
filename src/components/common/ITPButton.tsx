import { Button } from "primereact/button";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const ITPButton: FC<Props> = ({ children, className, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex justify-center gap-x-2 xl:mt-6 fullHd:mt-14 fullHd:py-2 text-xs items-center py-1.5 rounded font-lora font-normal fullHd:text-sm ${className} `}
    >
      {children}
    </Button>
  );
};

export default ITPButton;
