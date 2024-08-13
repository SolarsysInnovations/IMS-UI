import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import CompanyDetails from "../../pages/super-admin-company/companyDetailsScreen";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import { useDeleteUserMutation, useGetSingleUserMutation, useGetUsersListQuery } from "../../redux-store/api/injectedApis";
import { setUserData } from "../../redux-store/slices/userSlice";
import TableHeader from "../../components/layouts/TableHeader";
import DialogBoxUi from "../../components/ui/DialogBox";
import ActionButtons from "../../components/ui/ActionButtons";
import { useRolePermissions } from "../../hooks/useRolePermission";

const MyCellRenderer = ({ id }: { id: any }) => {
  const dispatch = useDispatch();
  const [openDialogBox, setIsOpenDialogBox] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { data: services, refetch } = useGetUsersListQuery();
  const [deleteCompany, { isLoading: deleteCompanyLoading, error: deleteCompanyErrorObject, isSuccess: deleteCompanySuccess, isError: deleteCompanyError }] = useDeleteUserMutation();
  const [getCompany, { data: companyData }] = useGetSingleUserMutation();
  const navigate = useNavigate();
  const { canEditCompanies, canViewCompanies, canDeleteCompanies } = useRolePermissions();
  // Snackbar notifications
  useSnackbarNotifications({
    error: deleteCompanyError,
    errorMessage: 'Error deleting company',
    success: deleteCompanySuccess,
    successMessage: 'Company deleted successfully',
    errorObject: deleteCompanyErrorObject,
  });

  useEffect(() => {
    if (companyData) {
      dispatch(setUserData(companyData));
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
        console.log("Fetched company data:", companyData); // Check the data in the console
        dispatch(setUserData(companyData));
        console.log("companyData after", companyData)
        setOpenModal(true);
      } else {
        console.error("Error fetching company data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleDialogOpen = async () => {
    try {
      const response = await getCompany(id);
      if ('data' in response) {
        setIsOpenDialogBox(true);
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleModalClose = () => setOpenModal(false);

  const handleEditClick = async () => {
    try {
      const response = await getCompany(id);
      if ("data" in response) {
        const companyData = response.data;
        console.log("edit company data", companyData);
        dispatch(setUserData(companyData));
        navigate("/company/create");
      } else {
        console.error("Error response:", response.error);
      }
    } catch (error) {
      console.error("Error handling edit click:", error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this company?");
    if (confirmed) {
      deleteCompany(id);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleDialogOpen}
        canView={canViewCompanies}
        canDelete={canDeleteCompanies}
        canEdit={canEditCompanies}
      />

      <DialogBoxUi
        paperWidth="900px"
        paperMaxWidth="900px"
        open={openDialogBox}

        content={
          <>

            <TableHeader headerName="Company Details" />
            <Box sx={{ marginTop: "15px" }}>
              <CompanyDetails details={companyData || []} />
            </Box>

          </>
        }
        handleClose={() => setIsOpenDialogBox(false)}
      />
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
];
