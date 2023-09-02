import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";

export default function SignedOutLinks() {
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <Button
          component={Link}
          to="/login"
          variant="text"
          style={{ color: grey[100] }}
        >
          Log In
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="text"
          style={{ color: grey[100] }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}
