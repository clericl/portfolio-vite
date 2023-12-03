import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import useScroll from "./utils/useScroll";

import "./styles/global.scss";

function App() {
  useScroll();

  return (
    <div className="main">
      <Layout />
      <Outlet />
    </div>
  );
}

export default App;
