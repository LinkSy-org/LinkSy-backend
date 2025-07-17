import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  const theme = useTheme();

  return (
    <HorizontalStack spacing={1} alignItems="center">
      <Typography
        color="text.secondary"
        variant="subtitle2"
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Sort by:
      </Typography>

      <FormControl
        size="small"
        sx={{
          minWidth: 150,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.paper,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            paddingLeft: 1,
            paddingRight: 1,
          },
        }}
      >
        <Select
          size="small"
          value={sorts[sortBy]}
          onChange={onSortBy}
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          {Object.keys(sorts).map((sortName, i) => (
            <MenuItem value={sorts[sortName]} key={i}>
              {sorts[sortName]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </HorizontalStack>
  );
};

export default SortBySelect;
