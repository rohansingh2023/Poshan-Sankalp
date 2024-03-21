import Icon from "@mui/material/Icon";
import SignInBasic from "pages/LandingPages/SignIn";

const routes = [
  {
    name: "Predict",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    // href: "#predict",
    route: "#predict",
  },
  {
    name: "Dashboard",
    icon: <Icon>view_day</Icon>,
  },
  {
    name: "SignIn",
    route: "/signin",
    component: <SignInBasic />,
  },
];

export default routes;
