import * as React from "react";

import { EPlayerType, TPlayer } from "../types/players";

import Box from "@mui/material/Box";
import Filter from "../components/Filter";
import Search from "../components/Search";
import Table from "../components/Table";
import { debounce } from "@mui/material";
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
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Search
          name={filters.name}
          options={players}
          setName={debounceSetName}
        />
        <Filter type={filters.type} setType={setType} />
      </Box>
      <Table rows={players} />
    </Box>
  );
};

export default PlayersList;
