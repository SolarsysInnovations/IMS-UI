import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBoxUi from '../../../components/ui/DialogBox';
import PortalLinkCreate from './Portal-link-create';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deletePortalLink,
  getPortalList,
  getSinglePortal,
} from '../../../api/services';

const PortalLinkList: React.FC = () => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [singlePortalData, setSinglePortalData] = useState({
    id: '',
    label: '',
    url: '',
    description: '',
  });
  const [key, setKey] = useState<number>(0);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['getPortalList'],
    queryFn: getPortalList,
    staleTime: 5 * 60 * 1000,
  });

  const getSinglePortalMutation = useMutation({
    mutationFn: getSinglePortal,
    onSuccess: (data) => {
      setOpenDialogBox(true);
      setSinglePortalData(data);
    },
  });

  const deletePortalMutation = useMutation({
    mutationFn: deletePortalLink,
    onSuccess: () => {
      refetch();
    },
  });

  const handleEditClick = async (id: string) => {
    try {
      getSinglePortalMutation.mutate(id);
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this link?',
    );
    if (confirmed) {
      try {
        deletePortalMutation.mutate(id);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const handleModalClose = () => {
    setKey((prevKey) => prevKey + 1);
    setOpenDialogBox(false);
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
        open={openDialogBox}
        content={
          <PortalLinkCreate
            linkValue={singlePortalData}
            key={key}
            handleClose={handleModalClose}
          />
        }
        handleClose={handleModalClose}
      />
      <Grid container spacing={2} mt={1} sx={{ width: '1020px' }}>
        {data
          ? data.map((link: any) => (
              <Grid item xs={3} key={link.id}>
                <Card
                  elevation={2}
                  sx={{
                    width: '200px',
                    height: '40px',
                    marginBottom: '15px',
                    borderRadius: '7px',
                  }}
                >
                  <CardContent sx={{ padding: 2 }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: '-10px',
                      }}
                    >
                      <LanguageIcon
                        style={{
                          color: 'blue',
                          marginLeft: '-10px',
                          height: '15px',
                        }}
                      />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '12px', marginLeft: '2px' }}
                      >
                        {link.label}
                      </a>
                      <Box
                        sx={{
                          marginLeft: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton
                          style={{
                            color: 'blue',
                            height: '5px',
                            fontSize: 'small',
                          }}
                          onClick={() => handleEditClick(link.id)}
                        >
                          <EditIcon style={{ fontSize: 'small' }} />
                        </IconButton>
                        <IconButton
                          style={{ color: 'blue', fontSize: 'small' }}
                          onClick={() => handleDeleteClick(link.id)}
                        >
                          <DeleteIcon style={{ fontSize: 'small' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

export default PortalLinkList;
