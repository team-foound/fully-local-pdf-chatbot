import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function ChooseModel(props) {
  const { setModel } = { ...props };

  const handleChange = (event) => {
    setModel(event.target.value);

    /*
    marche pas car le worker est pas sur client
    console.log(typeof localStorage);
    if (typeof localStorage === "object") {
      localStorage.setItem("_model", event.target.value);
    }
    */
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "white" }} id="demo-simple-select-label">
          Choose model
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="mistral">mistral</MenuItem>
          <MenuItem value="llama2">llama2</MenuItem>
          <MenuItem value="codellama">codellama</MenuItem>
          <MenuItem value="llama2-uncensored">llama2-uncensored</MenuItem>
          <MenuItem value="llama2:13b">llama2:13b</MenuItem>
          <MenuItem value="llama2:70b">llama2:70b</MenuItem>
          <MenuItem value="orca-mini">orca-mini</MenuItem>
          <MenuItem value="vicuna">vicuna</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
