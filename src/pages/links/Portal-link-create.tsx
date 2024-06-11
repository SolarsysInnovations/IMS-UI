import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteLinkMutation, useGetLinkByIdMutation, useGetLinkQuery } from "../../redux-store/link/linkApi";
import { AppDispatch } from "../../redux-store/store";
import { useDispatch } from "react-redux";
import { setLinkData } from "../../redux-store/link/linkApi";

const PortalLinkScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newLink, setNewLink] = useState({
    url: "",
    label: "",
    description: "",
  });
  const { data: linkCreation, error, isLoading, refetch } = useGetLinkQuery();
  const [deletedLink, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData }] = useDeleteLinkMutation<{ deletedService: any, error: any, isLoading: any, isSuccess: any, data: any }>();
  const [getLink, {  }] = useGetLinkByIdMutation();
  const [openModal, setOpenModal] = React.useState(false);

  // Function to fetch links when component mounts and after deletion
  useEffect(() => {
    refetch();
  }, [deletedData]); // Refetch data after deletion

  const handleEditClick = async (id: string) => {
    console.log("values", id);
    try {
      const response = await getLink(id);
      if ('data' in response) {
        const linksData = response.data;
        console.log("data", linksData);
        await dispatch(setLinkData(linksData));
        setOpenModal(true);
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  }

  const handleDeleteClick = async (id: any) => {
    const confirmed = window.confirm("Are you sure you want to delete this link?");
    if (confirmed) {
      try {
        await deletedLink(id);
        // Data will be refetched automatically due to useEffect
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

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
                      <LanguageIcon
                        style={{ color: "blue", marginRight: "2px" }}
                      />
                      <a href={link.url}>{link.label}</a>
                      <Box
                        sx={{
                          marginLeft: "auto",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          style={{ color: "blue", fontSize: "inherit" }}
                          onClick={() => handleEditClick(link.id)}
                        >
                          <EditIcon style={{ fontSize: "inherit" }} />
                        </IconButton>
                        <IconButton
                          style={{ color: "blue", fontSize: "inherit" }}
                          onClick={() => handleDeleteClick(link.id)}
                        >
                          <DeleteIcon style={{ fontSize: "inherit" }} />
                        </IconButton>
                      </Box>
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
