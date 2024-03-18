import Icon from "@mui/material/Icon";

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
];

export default routes;
