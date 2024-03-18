import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/shapes/waves-white.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function Download() {
  const [file, setFile] = useState();
  const [result, setResult] = useState();
  const [wasting, setWasting] = useState("");
  const [underWeight, setunderWeight] = useState("");
  const [stunting, setStunting] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRes, setIsRes] = useState(false);

  const handleChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };
  console.log(file);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    // const id = toast.loading("Predicting....");
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict-v2", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data?.data);
      setLoading(false);
      setIsRes(true);
      // toast.success("Prediction successfull", {
      //   id,
      // });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(`${error}`, {
      //   id,
      // });
    }
  };

  console.log(loading);

  useEffect(() => {
    switch (result?.Stunting) {
      case 0:
        setStunting("Moderately Stunted");
        break;
      case 1:
        setStunting("Normal");
        break;
      case 2:
        setStunting("Severely Stunted");
        break;
      default:
        break;
    }

    switch (result?.Underweight_Overweight) {
      case 0:
        setunderWeight("Moderately Underweight");
        break;
      case 1:
        setunderWeight("Normal");
        break;
      case 2:
        setunderWeight("Overweight");
        break;
      default:
        break;
    }

    switch (result?.wasting) {
      case 0:
        setWasting("Normal");
        break;
      case 1:
        setWasting("Overweight");
        break;

      default:
        break;
    }
  }, [result?.Stunting, result?.Underweight_Overweight, result?.wasting]);

  return (
    <div id="predict">
      <MKBox component="section" py={{ xs: 0, sm: 12 }}>
        <MKBox
          variant="gradient"
          bgColor="dark"
          position="relative"
          borderRadius="xl"
          sx={{ overflow: "hidden" }}
        >
          <MKBox
            component="img"
            src={bgImage}
            alt="pattern-lines"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            zIndex={1}
            opacity={0.2}
          />
          <Container sx={{ position: "relative", zIndex: 2, py: 12 }}>
            <Grid
              container
              item
              xs={12}
              md={7}
              justifyContent="center"
              mx="auto"
              textAlign="center"
            >
              <MKTypography variant="h3" color="white">
                Make predictions
              </MKTypography>
              {/* <MKTypography variant="h3" color="white" mb={1}>
              UI Kit for ReactJS &amp; MUI?
            </MKTypography> */}
              <MKTypography variant="body2" color="white" mb={6}>
                ( Upload a file with .csv extension. Should contain one row of all the required
                fields. )
              </MKTypography>
              {/* <MKTypography variant="body2" color="white" mb={6}>
              Should contain one row of all the required fields
            </MKTypography> */}
              <div className="flex md:flex-row flex-col items-center justify-center space-x-10">
                <div className="w-[70%] md:w-full flex flex-col space-x-10">
                  <div className="border-none p-[5px] rounded-[7px] bg-blue-400 mt-5">
                    <input type="file" accept=".csv" onChange={handleChange} />
                  </div>

                  {/* <button className="p-2 bg-red-300 rounded-lg mt-5" onClick={handleSubmit}>
                Submit
              </button> */}
                </div>
                <MKButton
                  variant="gradient"
                  color="info"
                  size="large"
                  component="a"
                  // href="https://www.creative-tim.com/product/material-kit-react"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                >
                  Download Now
                </MKButton>
              </div>
              {isRes && (
                <div className="mt-5 p-2 text-blue-500">
                  <p className="text-2xl font-medium">Your Predictions are: </p>
                  <p>Stunting : {stunting}</p>
                  <p>Underweight-Overweight : {underWeight}</p>
                  <p>Wasting : {wasting}</p>
                </div>
              )}
            </Grid>
          </Container>
        </MKBox>
      </MKBox>
    </div>
  );
}

export default Download;
