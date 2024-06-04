import React, { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import TableHeader from "../../components/layouts/TableHeader";
import { Add } from "@mui/icons-material";
import LinkCreation from "./LinkCreation";
import DialogBoxUi from "../../components/ui/DialogBox";
import PortalLinkScreen from "./Portal-link-create";

const AddLink: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState("");
  
  const handleModalOpen = () => {
    setIsOpenDialogBox(true);
  };

  return (
    <div>
      <Box>
        
      <TableHeader headerName={"Links"} buttons={[{ label: "Add Link", icon: Add, onClick: handleModalOpen }]} />
        <DialogBoxUi
                            open={opendialogBox} // Set open to true to display the dialog initially
                            
                            content={
                                <>
                                    <LinkCreation  />
                                </>
                            }
                            handleClose={() => {
                                setIsOpenDialogBox(false)
                                setPopUpComponent("") 
                            }}
                        />
        <PortalLinkScreen />
      </Box>
    </div>
  );
};

export default AddLink;
