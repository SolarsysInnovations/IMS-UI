import React, { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useGetLinkQuery } from "../../redux-store/link/linkApi";

const PortalLinkScreen: React.FC = () => {
  const [newLink, setNewLink] = useState({ url: "", label: "", description: "" });
  const { data: linkCreation, error, isLoading, refetch } = useGetLinkQuery();

  return (
    <div>
      <Box>     
        <Typography
          mt={2}
          sx={{ display: "flex", width: "1020px", flexWrap: "wrap" }}
          variant="body1"
        >
          {linkCreation &&
            linkCreation.map((link, index) => (
              <Card
                elevation={7}
                sx={{ display: "flex", width: "180px", margin: "10px" }}
                key={index}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", width: "300px" }}
                  >
                    <Box sx={{ alignItems: "center", display: "flex" }}>
                      {" "}
                      <LanguageIcon style={{ color: "blue" }} />
                      <a href={link.url}>
                        {link.label}
                      </a>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Typography>
      </Box>
    </div>
  );
};

export default PortalLinkScreen;
