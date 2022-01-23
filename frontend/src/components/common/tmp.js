import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGridApiRef, DataGridPro } from "@mui/x-data-grid-pro";

export default function edit() {

  return (
    <div>
      <DataGridPro
        rows={
          (["Name", { name }],
          ["Email", { email }],
          ["Shop Name", { shop_name }],
          ["Contact Number", { contact_number }],
          ["Open Time", { open_time }],
          ["Close Time", { close_time }])
        }
      />
    </div>
  );
}
