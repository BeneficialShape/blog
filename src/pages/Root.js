import { Outlet } from "react-router";
import NavigationBar from "../components/NavigationBar";

const Root = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};
export default Root;
