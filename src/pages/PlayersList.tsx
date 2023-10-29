import * as React from "react";

import { EPlayerType, TPlayer } from "../types/players";
import { Grid, debounce } from "@mui/material";

import Box from "@mui/material/Box";
import Filter from "../components/Filter";
import Search from "../components/Search";
import Table from "../components/Table";
import getPlayers from "../services/players";
import useLocalStorage from "../hooks/useLocalStorage";

type Filters = {
  name: string;
  type: EPlayerType | string;
};

const PlayersList: React.FC = () => {
  const [players, setPlayers] = React.useState<TPlayer[]>([]);
  const [filters, setFilters] = useLocalStorage<Filters>(
    "cricketers-app-filters",
    { type: EPlayerType.ALL, name: "" } as Filters
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

      <Table rows={players} />
    </Box>
  );
};

export default PlayersList;
