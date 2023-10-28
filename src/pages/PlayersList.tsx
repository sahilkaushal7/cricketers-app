import * as React from "react";

import { TPlayer } from "../types";
import Table from "../components/Table";
import getPlayers from "../services/players";

const PlayersList: React.FC = () => {
  const [players, setPlayers] = React.useState<TPlayer[]>([]);
  const fetchPlayers = React.useCallback(() => {
    getPlayers({}).then((res) => {
      setPlayers(res);
    });
  }, []);

  React.useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);
  
  return <div><Table rows={players}/></div>;
};

export default PlayersList;
