import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import { TPlayer } from "../types/players";
import TextField from "@mui/material/TextField";

interface IComboxBox {
  name: string;
  options: TPlayer[];
  setName: (name: string) => void;
}

const Search: React.FC<IComboxBox> = ({ name, options, setName }) => {
  return (
    <Autocomplete
      sx={{ width: 200 }}
      id="free-solo-demo"
      freeSolo
      open={false}
      value={name}
      options={options.map((option) => option.name)}
      clearIcon={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by name"
          onChange={(e) => setName(e.target.value)}
        />
      )}
    />
  );
};

export default Search;
