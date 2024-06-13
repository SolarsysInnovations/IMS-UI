import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, IconButton, CardHeader } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteLinkMutation, useGetLinkByIdMutation, useGetLinkQuery } from "../../redux-store/link/linkApi";
import { AppDispatch } from "../../redux-store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData } from "../../redux-store/global/globalState";
import DialogBoxUi from "../../components/ui/DialogBox";
import PortalLinkCreate from "./Portal-link-create";

const PortalLinkList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: linkCreation, error, isLoading, refetch } = useGetLinkQuery();
  const [deletedLink, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData }] = useDeleteLinkMutation();
  const [getLink, {  }] = useGetLinkByIdMutation();
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const linkValue = useSelector((state: any) => state.globalState.data);
  const [key, setKey] = useState<number>(0);

  // Function to fetch links when component mounts and after deletion or creation
  useEffect(() => {
    refetch();
  }, [deletedData, linkCreation]); // Refetch data after deletion or creation

  const handleEditClick = async (id: string) => {
    console.log("values", id);
    try {
      const response = await getLink(id);
      if ('data' in response) {
        const linksData = response.data;   
        console.log("openmodal before setting state:", opendialogBox);
        setIsOpenDialogBox(true);
        console.log("data", linksData);
        dispatch(setData(linksData));
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  }

  const handleDeleteClick = async (id: number) => {
    console.log("del", id);
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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading links: {error.message}</Typography>;
  }

  const handleModalClose = () => {
    refetch();
    setIsOpenDialogBox(false);
  };

  return (
    <div>
      <Box>
        <DialogBoxUi
          open={opendialogBox}
          content={
            <>
              <PortalLinkCreate linkValue={linkValue} key={key} />
            </>
          }
          handleClose={() => {
            setIsOpenDialogBox(false);
          }}
        />
        <Typography
          mt={2}
          sx={{ display: "flex", width: "1020px", flexWrap: "wrap" }}
          variant="body1"
        >
          {linkCreation &&
            linkCreation.map((link) => (
              <Card
                elevation={7}
                sx={{ display: "flex", width: "180px", margin: "10px", height: "72px" }}
                key={link.id} // Use unique ID for key
              > 
                <CardContent>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", width: "300px", marginTop: "-10px" }}
                  >
                    <Box sx={{ alignItems: "center", display: "flex" }}>
                      <LanguageIcon
                        style={{ color: "blue", marginLeft: "-10px" }}
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

export default PortalLinkList;
