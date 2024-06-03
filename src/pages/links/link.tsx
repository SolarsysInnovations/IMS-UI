import React, { useEffect, useState } from "react";
import { useAddLinkMutation } from "../../redux-store/link/linkApi";
import { ToastContainer, toast } from "react-toastify";
import { useGetLinkQuery } from "../../redux-store/link/linkApi";
import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableHeader from "../../components/layouts/TableHeader";
import ModalUi from "../../components/ui/ModalUi";
import { Add } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import LinkCreation from "./LinkCreation";

const AddLink: React.FC = () => {
  const [addLink, { isLoading, isSuccess, isError, error }] =
    useAddLinkMutation();
    
  const { data: linkList, refetch } = useGetLinkQuery();
  const [openModal, setOpenModal] = React.useState(false);

  const StyledLink = styled("a")(({ theme }) => ({
    marginLeft: "8px",
    color: "inherit", // Use your preferred initial color
    textDecoration: "none",
    "&:hover": {
      color: "blue", // Change this to your preferred hover color
      textDecoration: "underline",
    },
  }));
  
  const handleModalClose = () => {
    refetch();
    setOpenModal(false);
  };

  const button = [
    { label: "Add Link", icon: Add, onClick: () => setOpenModal(true) },
  ];
   useEffect(() => {
     refetch();
   }, [isSuccess]);

  const linkCreation = [
    {
      url: "https://contents.tdscpc.gov.in/",
      icon: <LanguageIcon style={{ color: "blue" }} />,
      label: "TRACES",
      description: "",
    },
    {
      url: "https://tin.tin.nsdl.com/oltas/servlet/QueryTaxpayer",
      icon: <LanguageIcon style={{ color: "blue" }} />,
      label: "OLTAS Challan",
      description: "",
    },
  ];

  return (
    <div>
      <Box>
        <TableHeader headerName={"Links"} buttons={button} />
        <ModalUi open={openModal} onClose={handleModalClose}>
          <Box sx={{ marginTop: "5px", justifyContent: "center" }}>
            <ToastContainer />
            <LinkCreation />
          </Box>
        </ModalUi>
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
                      {link.icon}
                      <a href={link.url}>
                        {link.label}
                        <StyledLink />
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

export default AddLink;
