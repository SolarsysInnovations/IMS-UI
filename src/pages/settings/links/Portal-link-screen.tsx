import { useEffect, useState } from 'react';
import PortalLinkList from './Portal-link-list';
import TableHeader from '../../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import DialogBoxUi from '../../../components/ui/DialogBox';
import PortalLinkCreate from './Portal-link-create';

const LinkScreen = () => {
  const [key, setKey] = useState<number>(0);
  const [openDialogBox, setOpenDialogBox] = useState(false);

  const handleModalOpen = () => {
    setOpenDialogBox(true);
  };

  const handleModalClose = () => {
    setOpenDialogBox(false);
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <TableHeader
        headerName={'Links'}
        buttons={[{ label: 'Add Link', icon: Add, onClick: handleModalOpen }]}
      />
      <PortalLinkList />

      <DialogBoxUi
        open={openDialogBox}
        content={<PortalLinkCreate key={key} handleClose={handleModalClose} />}
        handleClose={handleModalClose}
      />
    </>
  );
};
export default LinkScreen;
