import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  // Navigate,
} from "react-router-dom";
import Layout from "../Layout";
import { Dashboard, Home } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);
