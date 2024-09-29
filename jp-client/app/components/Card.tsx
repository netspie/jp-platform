import { FC, HTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children, ...props }) => (
  <div {...props} className={cn("max-w-xl", props.className)}>
    <div className="bg-white shadow-md rounded-b-xl ">{children}</div>
  </div>
);

export default Card;
