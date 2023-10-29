import * as React from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { EPlayerType } from "../types/players";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { playerTypeMap } from "../utils/constants";

interface IFilter {
  type: EPlayerType | string;
  setType: (type: EPlayerType) => void;
}

const Filter: React.FC<IFilter> = ({ type, setType}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as EPlayerType);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Filter by type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        defaultValue={type}
        label="Filter by type"
        onChange={handleChange}
      >
        {Object.entries(playerTypeMap).map(([playerType, value]) => (
          <MenuItem value={playerType} key={playerType}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
