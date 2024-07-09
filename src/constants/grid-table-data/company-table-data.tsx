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
import CompanyEdit from "../../pages/company/companyEditscreen";
import { setData } from "../../redux-store/global/globalState";
import TableHeader from "../../components/layouts/TableHeader";
import CompanyDetails from "../../pages/company/companyDetailsScreen";

const MyCellRenderer = ({ id }: { id: any }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const { data: services, refetch } = useGetCompanyQuery();
  const [deleteCompany, { isLoading: deleteCompanyLoading, error: deleteCompanyErrorObject, isSuccess: deleteCompanySuccess, isError: deleteCompanyError, data: deletedData, }] = useDeleteCompanyMutation();
  const [getCompany, { data: companyData }] = useGetCompanyDataByIdMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (companyData) {
      dispatch(setCompanyData(companyData));
    }
  }, [companyData, dispatch]);

  const handleModalOpen = async () => {
    
    try {
      const response = await getCompany(id);
      if ("data" in response) {
        const companyData = response.data;
        console.log("edit company data",companyData);
        dispatch(setData(companyData));
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  const handleModalClose = () => setOpenModal(false);

  useEffect(() => {
    refetch();
  }, [deleteCompanySuccess, refetch]);

  const handleEditClick = async () => {
    try {
      const response = await getCompany(id);
      if ("data" in response) {
        const companyData = response.data;
        console.log("edit company data",companyData);
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
                    <CompanyDetails  />
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
      return <MyCellRenderer id={params.row?.userId} />;
    },
  },
  {
    field: "id",
    headerName: "ID",
    width: 200,
    editable: true,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 200,
    editable: true,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 200,
    editable: false,
  },
  {
    field: "userRole",
    headerName: "User Role",
    width: 200,
    editable: false,
  },
  {
    field: "userAccess",
    headerName: "User Access",
    width: 200,
    editable: false,
  },
  {
    field: "companyEmail",
    headerName: "Company Email",
    width: 200,
    editable: false,
  },
];
