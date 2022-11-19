import Navbar from "./Navbar";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type LayoutWrapperProps = {
  children: ReactNode;
};

function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div style={{ flex: 6 }}>{children}</div>
        <Rightbar />
      </div>
    </div>
  );
}

export default LayoutWrapper;
