import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TableHeader from "../../components/layouts/TableHeader";
import { styled } from "@mui/material/styles";

const About: React.FC = () => {
    const StyledLink = styled("a")(({ theme }) => ({
        marginLeft: "8px",
        color: "inherit", // Use your preferred initial color
        textDecoration: "none",
        "&:hover": {
          color: "blue", // Change this to your preferred hover color
          textDecoration: "underline",
        },
      }));
  return (
    <div>
       <TableHeader headerName={"About Us"} />
          <Typography variant="body1">
            SSINTEK :
            <StyledLink
              href="https://www.solarsystek.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ssintek.in
            </StyledLink>
          </Typography>
    </div>
  );
};

export default About;
