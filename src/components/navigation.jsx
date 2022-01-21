import React from "react";
import { Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import Dashboard from "./dashboard/dashboard";

export default function Navigation() {
  return (
    <Box>
      <Route path="/" exact component={Dashboard} />
    </Box>
  );
}