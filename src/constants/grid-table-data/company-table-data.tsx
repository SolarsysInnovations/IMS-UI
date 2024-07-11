import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import ServiceDetails from "../../pages/service/serviceDetails";
import {
  useDeleteCompanyMutation,
  useGetCompanyQuery,
  useGetCompanyDataByIdMutation,
  setCompanyData,
} from "../../redux-store/company/companiesApi";
import React from "react";
import { setData } from "../../redux-store/global/globalState";
import TableHeader from "../../components/layouts/TableHeader";
import CompanyDetails from "../../pages/company/companyDetailsScreen";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";

const MyCellRenderer = ({ id }: { id: any }) => {

  console.log("id", id);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const { data: services, refetch } = useGetCompanyQuery();

  const [deleteCompany, { isLoading: deleteCompanyLoading, error: deleteCompanyErrorObject, isSuccess: deleteCompanySuccess, isError: deleteCompanyError, data: deletedData, }] = useDeleteCompanyMutation();

  const [getCompany, { data: companyData }] = useGetCompanyDataByIdMutation();
  const navigate = useNavigate();

  // * --------- delete snackbar -----------
  useSnackbarNotifications({
    error: deleteCompanyError,
    errorMessage: 'Error deleting company',
    success: deleteCompanySuccess,
    successMessage: 'Company deleted successfully',
    errorObject: deleteCompanyErrorObject,
  });

  useEffect(() => {
    if (companyData) {
      dispatch(setCompanyData(companyData));
    }
  }, [companyData, dispatch]);

  useEffect(() => {
    refetch();
  }, [deleteCompanySuccess, refetch]);

  const handleModalOpen = async () => {

    try {
      const response = await getCompany(id);
      if ("data" in response) {
        const companyData = response.data;
        console.log("edit company data", companyData);
        dispatch(setData(companyData));
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  const handleModalClose = () => setOpenModal(false);


  const handleEditClick = async () => {
    try {
      const response = await getCompany(id);
      if ("data" in response) {
        const companyData = response.data;
        console.log("edit company data", companyData);
        dispatch(setData(companyData));
        navigate("/company/create");
      } else {
        console.error("Error response:", response.error);
      }
    } catch (error) {
      console.error("Error handling edit click:", error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmed) {
      deleteCompany(id);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        sx={{ padding: "3px" }}
        aria-label="edit"
        onClick={handleEditClick}
      >
        <EditIcon
          sx={{
            color: `grey.500`,
            fontSize: "15px",
            "&:hover": { color: "blue" },
          }}
          fontSize="small"
        />
      </IconButton>
      <IconButton
        sx={{ padding: "3px" }}
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <GridDeleteIcon
          sx={{
            color: `grey.500`,
            fontSize: "15px",
            "&:hover": { color: "blue" },
          }}
          fontSize="small"
        />
      </IconButton>
      <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
        <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
      </IconButton>
      <ModalUi topHeight="90%" open={openModal} onClose={handleModalClose}>
        <Box sx={{ marginTop: "15px" }}>
          <CompanyDetails />
        </Box>
      </ModalUi>
    </Stack>
  );
};

export const columns: GridColDef[] = [
  {
    field: "Action",
    headerName: "Action",
    width: 140,
    editable: false,
    renderCell: (params: any) => {
      const userId = params.row.id;
      console.log("userId:", userId); // Log the userId
      return <MyCellRenderer id={userId} />;
    },
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 150,
    editable: true,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 150,
    editable: false,
  },
  {
    field: "userRole",
    headerName: "User Role",
    width: 150,
    editable: false,
  },
  {
    field: "userAccess",
    headerName: "User Access",
    width: 150,
    editable: false,
  },

];
