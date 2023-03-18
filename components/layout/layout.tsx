import React, { ReactNode } from "react";
import { cn } from "@/utils/tailwind";
import HeaderIsland from "./headerIsland";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <div
      className={cn(
        "h-screen",
        "bg-white text-black dark:bg-black dark:text-white",
      )}
    >
      <HeaderIsland />
      {props.children}
    </div>
  </div>
);

export default Layout;
