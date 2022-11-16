import { PropsWithChildren, useEffect } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <div className="app-container">
      {children}
    </div>
  );
};
