import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/data/reportsBarChartData";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import reportsLineChartData from "layouts/data/reportsLineChartData";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <MDBox mt={4.5}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsBarChart
              color="info"
              title="Stunting"
              description="Bar Graph captures Stunting analysis."
              date="campaign sent 2 days ago"
              chart={reportsBarChartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="success"
              title="Wasting"
              description={<>Line Chart captures Wasting analysis.</>}
              date="updated 4 min ago"
              chart={sales}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="dark"
              title="Underweight/Overweight"
              description="Line Chart captures Underweight-Overweight analysis"
              date="just updated"
              chart={tasks}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;
