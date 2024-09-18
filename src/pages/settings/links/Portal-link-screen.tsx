import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PortalLinkList from "./Portal-link-list";
import TableHeader from "../../../components/layouts/TableHeader";
import { Add } from "@mui/icons-material";
import DialogBoxUi from "../../../components/ui/DialogBox";
import PortalLinkCreate from "./Portal-link-create";

const LinkScreen = () => {
  const linkValue = useSelector((state: any) => state.globalState.data);

  const [key, setKey] = useState<number>(0);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);

  const handleModalOpen = () => {
    setIsOpenDialogBox(true);
  };

  const handleModalClose = () => {
    setIsOpenDialogBox(false);
    setKey(prevKey => prevKey + 1); // Reset the key to force a re-render
  };

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [linkValue]);

  return (
    <>
      <TableHeader
        headerName={"Links"}
        buttons={[{ label: "Add Link", icon: Add, onClick: handleModalOpen }]}
      />
      <PortalLinkList />

      <DialogBoxUi
        open={opendialogBox}
        content={
          <PortalLinkCreate 
            key={key} 
            linkValue={linkValue} 
            handleClose={handleModalClose} // Ensure dialog can be closed
          />
        }
        handleClose={handleModalClose} // Ensure dialog can be closed
      />
    </>
  );
};
export default LinkScreen ;