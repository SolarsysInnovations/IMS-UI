import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeletePortalLinkMutation, useGetSinglePortalLinkMutation, useGetPortalLinkQuery } from "../../../redux-store/api/injectedApis";
import { AppDispatch } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../redux-store/global/globalState";
import DialogBoxUi from "../../../components/ui/DialogBox";
import PortalLinkCreate from "./Portal-link-create";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";

const PortalLinkList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: linkCreation, error, isLoading, refetch } = useGetPortalLinkQuery();
  const [deleteLink, { isSuccess: deleteLinkSuccess, isError: deleteLinkError, error: deleteLinkErrorObject }] = useDeletePortalLinkMutation();
  const [getLink] = useGetSinglePortalLinkMutation();
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const linkValue = useSelector((state: any) => state.globalState.data);
  const [key, setKey] = useState<number>(0);

  // Local state for managing notification messages
  const [notification, setNotification] = useState({
    success: false,
    error: false,
    errorMessage: '',
  });

  useEffect(() => {
    refetch();
  }, [linkCreation]); // Refetch data after creation or deletion

  useEffect(() => {
    if (deleteLinkSuccess) {
      setNotification({ success: true, error: false, errorMessage: '' });
      refetch(); // Refetch data after successful deletion
    } else if (deleteLinkError) {
      setNotification({
        success: false,
        error: true,
        errorMessage: 'Error deleting Link',
      });
    }
  }, [deleteLinkSuccess, deleteLinkError]);

  // Call the snackbar notification hook at the top level
  useSnackbarNotifications({
    success: notification.success,
    error: notification.error,
    errorMessage: notification.errorMessage,
    successMessage: 'Link deleted successfully',
  });

  const handleEditClick = async (id: string) => {
    try {
      const response = await getLink(id);
      if ('data' in response) {
        dispatch(setData(response.data));
        setIsOpenDialogBox(true);
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this link?");
    if (confirmed) {
      try {
        await deleteLink(id);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const handleModalClose = () => {
    setKey(prevKey => prevKey + 1); // Reset the key to force component re-render
    setIsOpenDialogBox(false); // Close the dialog
    refetch(); // Refetch the data after closing
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading links: {error.message}</Typography>;
  }

  return (
    <Box>
      <DialogBoxUi
        open={opendialogBox}
        content={
          <PortalLinkCreate 
            linkValue={linkValue} 
            key={key} 
            handleClose={handleModalClose} // Passing handleClose prop
          />
        }
        handleClose={handleModalClose} // Ensure dialog can be closed
      />
      <Grid container spacing={2} mt={1} sx={{ width: "1020px" }}>
        {linkCreation && linkCreation.map((link) => (
          <Grid item xs={3} key={link.id}>
            <Card
              elevation={2}
              sx={{ width: "200px", height: "40px", marginBottom:"15px", borderRadius:"7px"}}
            >
              <CardContent sx={{ padding: 2 }}>
                <Box sx={{ alignItems: "center", display: "flex", marginTop:"-10px"}}>
                  <LanguageIcon
                    style={{ color: "blue", marginLeft: "-10px", height:"15px" }}
                  />
                  <a
                    href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "12px", marginLeft: "2px" }}
                  >
                    {link.label}
                  </a>
                  <Box
                    sx={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      style={{ color: "blue", height:"5px" ,fontSize: "small" }}
                      onClick={() => handleEditClick(link.id)}
                    >
                      <EditIcon style={{ fontSize: "small" }} />
                    </IconButton>
                    <IconButton
                      style={{ color: "blue", fontSize: "small" }}
                      onClick={() => handleDeleteClick(link.id)}
                    >
                      <DeleteIcon style={{ fontSize: "small" }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PortalLinkList;
