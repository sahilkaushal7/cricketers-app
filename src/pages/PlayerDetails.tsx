import * as React from "react";

import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const PlayerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBackBtnClick = () => {
    navigate("/players");
  };

  const playerDetails: { label: string; value: string | undefined }[] = [
    {
      label: "Name",
      value: id,
    },
    {
      label: "Type",
      value: "type",
    },
    {
      label: "Points",
      value: "points",
    },
    {
      label: "DOB",
      value: "dob",
    },
    {
      label: "Age",
      value: "age",
    },
    {
      label: "Rank",
      value: "rank",
    },
    {
      label: "Description",
      value: "description",
    },
  ];

  return (
    <Box padding={2}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleBackBtnClick}
      >
        Back to players
      </Button>
      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 250, height: 250, fontSize: 150 }}>H</Avatar>
          </Grid>
          <Grid item flexGrow={1}>
            <Grid container spacing={1}>
              {playerDetails.map(({ value, label }) => (
                <Grid item xs={6}>
                  <Typography variant="h6" component="div">
                    {label}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5" component="div">
          Similar players
        </Typography>
      </Card>
    </Box>
  );
};

export default PlayerDetails;
