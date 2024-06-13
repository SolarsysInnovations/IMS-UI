import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PortalLinkList from "./Portal-link-list";
import TableHeader from "../../components/layouts/TableHeader";
import { Add } from "@mui/icons-material";
import DialogBoxUi from "../../components/ui/DialogBox";
import PortalLinkCreate from "./Portal-link-create";

const LinkScreen = () => {
  const linkValue = useSelector((state: any) => state.globalState.data);

  console.log("link value", linkValue);

  const [key, setKey] = useState<number>(0);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState("");

  const handleModalOpen = () => {
    setIsOpenDialogBox(true);
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
      <DialogBoxUi
        open={opendialogBox}
        content={
          <>
            <PortalLinkCreate linkValue={linkValue} key={key} />
          </>
        }
        handleClose={() => {
          setIsOpenDialogBox(false);
          setPopUpComponent("");
        }}
      />
      <PortalLinkList />
    </>
  );
};
export default LinkScreen;
