import * as React from "react";

import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { LOCAL_STORAGE_PLAYERS_MAP_KEY, playerTypeMap } from "../utils/constants";
import Table, { HeadCell } from "../components/Table";
import { getAge, getDate } from "../utils/methods";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TPlayer } from "../types/players";
import useLocalStorage from "../hooks/useLocalStorage";

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "points",
    numeric: true,
    label: "Points",
  },
  {
    id: "rank",
    numeric: true,
    label: "Rank",
  }
];


const PlayerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [playersMap] = useLocalStorage(
    LOCAL_STORAGE_PLAYERS_MAP_KEY,
    {} as {
      [key: string]: {
        player: TPlayer;
        similarPlayers: TPlayer[];
      };
    }
  );

  const player: TPlayer = React.useMemo(
    () => (id && playersMap[id]?.player) || ({} as TPlayer),
    [playersMap, id]
  );

  const similarPlayers: TPlayer[] = React.useMemo(
    () => (id && playersMap[id]?.similarPlayers) || ([] as TPlayer[]),
    [playersMap, id]
  );

  const handleBackBtnClick = () => {
    navigate("/players");
  };

  const playerDetails: { label: string; value: string | number }[] = [
    {
      label: "Name",
      value: player.name,
    },
    {
      label: "Type",
      value: playerTypeMap[player.type],
    },
    {
      label: "Points",
      value: player.points,
    },
    {
      label: "Rank",
      value: player.rank,
    },
    {
      label: "DOB",
      value: getDate(player.dob),
    },
    {
      label: "Age",
      value: getAge(player.dob),
    },
    {
      label: "Description",
      value: player.description,
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
        <Grid container spacing={3} alignItems="center">
          <Grid item sm={12} md={4} display="flex" justifyContent="center">
            <Avatar sx={{ width: 200, height: 200, fontSize: 150 }}>{player?.name?.charAt(0)}</Avatar>
          </Grid>
          <Grid item sm={12} md={8}>
            <Grid container spacing={1}>
              {playerDetails.map(({ value, label }) => (
                <Grid key={label} item xs={label === "Description" ? 12 : 6}>
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
          <Table rows={similarPlayers} headCells={headCells} defaultRowsPerPage={5}/>
        </Typography>
      </Card>
    </Box>
  );
};

export default PlayerDetails;
