import * as React from "react";

import { EPlayerType, TPlayer } from "../types/players";
import { Grid, debounce } from "@mui/material";
import {
  LOCAL_STORAGE_FILTERS_KEY,
  LOCAL_STORAGE_PLAYERS_MAP_KEY,
} from "../utils/constants";
import Table, { HeadCell } from "../components/Table";

import Box from "@mui/material/Box";
import Filter from "../components/Filter";
import Search from "../components/Search";
import getPlayers from "../services/players";
import useLocalStorage from "../hooks/useLocalStorage";

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
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
  },
  {
    id: "dob",
    numeric: true,
    label: "Age",
  },
];

type Filters = {
  name: string;
  type: EPlayerType | string;
};

const PlayersList: React.FC = () => {
  const [players, setPlayers] = React.useState<TPlayer[]>([]);
  const [originalListOfPlayers, setOriginalListOfPlayers] = React.useState<TPlayer[]>([]);
  const [filters, setFilters] = useLocalStorage<Filters>(
    LOCAL_STORAGE_FILTERS_KEY,
    { type: EPlayerType.ALL, name: "" } as Filters
  );
  const [playersMap, setPlayersMap] = useLocalStorage(
    LOCAL_STORAGE_PLAYERS_MAP_KEY,
    {} as {
      [key: string]: {
        player: TPlayer;
        similarPlayers: TPlayer[];
      };
    }
  );

  const updateListBasedOnFilters = React.useCallback(
    (currentPlayers?: TPlayer[]) => {
      setPlayers((prev) =>
        (currentPlayers || prev).filter(
          (player) =>
            player.name?.toLowerCase()?.includes(filters.name?.toLowerCase()) &&
            (filters.type === EPlayerType.ALL || player.type === filters.type)
        )
      );
    },
    [filters]
  );

  const fetchPlayers = React.useCallback(() => {
    getPlayers({}).then((res) => {
      setOriginalListOfPlayers(res);
      updateListBasedOnFilters(res);
    });
  }, [updateListBasedOnFilters]);

  React.useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const setName = React.useCallback(
    (name: string) => {
      setFilters({ ...filters, name });
      updateListBasedOnFilters();
    },
    [filters, setFilters, updateListBasedOnFilters]
  );

  const debounceSetName = debounce(setName, 300);

  const setType = React.useCallback(
    (type: EPlayerType) => {
      setFilters({ ...filters, type });
      updateListBasedOnFilters();
    },
    [filters, setFilters, updateListBasedOnFilters]
  );

  const selectPlayer = React.useCallback(
    (player: TPlayer) => {
      const similarPlayers = originalListOfPlayers.filter(
        ({ type, id }) => type === player.type && id !== player.id
      );
      setPlayersMap({
        ...playersMap,
        [player.id]: {
          player,
          similarPlayers,
        },
      });
    },
    [originalListOfPlayers, playersMap, setPlayersMap]
  );

  return (
    <Box padding={2}>
      <Grid
        container
        spacing={2}
        marginBottom={2}
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={4}>
          <Search
            name={filters.name}
            options={players}
            setName={debounceSetName}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Filter type={filters.type} setType={setType} />
        </Grid>
      </Grid>
      <Table rows={players} headCells={headCells} selectRow={selectPlayer} />
    </Box>
  );
};

export default PlayersList;
