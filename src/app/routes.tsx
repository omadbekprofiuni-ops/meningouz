import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { MapPage } from "./pages/MapPage";
import { RiskScreening } from "./pages/RiskScreening";
import { Vaksinatsiya } from "./pages/Vaksinatsiya";
import { Kabinet } from "./pages/Kabinet";
import { Tahlil } from "./pages/Tahlil";
import { Choralar } from "./pages/Choralar";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "tahlil", Component: Tahlil },
      { path: "map", Component: MapPage },
      { path: "risk", Component: RiskScreening },
      { path: "vaksinatsiya", Component: Vaksinatsiya },
      { path: "choralar", Component: Choralar },
      { path: "kabinet", Component: Kabinet },
    ],
  },
]);
