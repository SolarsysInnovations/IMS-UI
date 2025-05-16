import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePathname from '../../hooks/usePathname';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import TableHeader from '../../components/layouts/TableHeader';
import { KeyboardBackspaceTwoTone } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';

const Reportscreen: React.FC = () => {
  const pathname = usePathname();
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/reports/araging`);
  };
  const handleClick1 = async () => {
    navigate(`/reports/invoice`);
  };
  return (
    <div>
      <TableHeader
        headerName={pathname}
        buttons={[
          {
            label: 'Back',
            icon: KeyboardBackspaceTwoTone,
            onClick: () => navigate(-1),
          },
        ]}
      />

      <Grid container spacing={2} marginTop={-1} marginLeft={-2}>
        <Grid item xs="auto">
          <Button
            variant="text"
            color="primary"
            startIcon={<InfoIcon />}
            onClick={handleClick}
          >
            AR Aging Summary
          </Button>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <Button
          variant="text"
          color="primary"
          startIcon={<DescriptionIcon />}
          onClick={handleClick1}
        >
          Invoice Detail Summary
        </Button>
      </Grid>
    </div>
  );
};

export default Reportscreen;
