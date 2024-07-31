import React, { useEffect, useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack,Box } from '@mui/material';
import TableHeader from "../../components/layouts/TableHeader";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useDeleteRoleMutation, useGetRoleByIdMutation, useGetRoleQuery, useUpdateRoleMutation, setRoleData } from '../../redux-store/role/roleApi';
import usePathname from '../../hooks/usePathname';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { AppDispatch } from '../../redux-store/store';
import { useDispatch } from 'react-redux';
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";

import DialogBoxUi from '../../components/ui/DialogBox';
import { RolesEditFields } from '../../constants/form-data/form-data-json';
import CustomerDetails from '../customer/customerDetails';

const invoiceOptions = ["ADMIN", "APPROVER", "ENDUSER"]

const RolesDropdown = ({ params }: { params: GridRenderCellParams }) => {

    const [status, setStatus] = useState(params.value);
    const [updateRoles, { isSuccess: updateSuccess }] = useUpdateRoleMutation();
    const { data: rolesList, error, isLoading, refetch: fetchRolesList } = useGetRoleQuery();

    useEffect(() => {
        if (updateSuccess) {
            fetchRolesList();
        }
    }, [updateSuccess, fetchRolesList]);

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const newStatus = event.target.value as string;
        setStatus(newStatus);

        const updatedRoles = {
            ...params.row,
            userRole: newStatus,
        };

        try {
            const response = await updateRoles({ id: updatedRoles.id, data: updatedRoles });
            console.log("Update response:", response);
            if ('error' in response) {
                console.error("Error updating invoice status:", response.error);
            } else {
                console.log(`Invoice status updated: ${newStatus}`);
            }
        } catch (error) {
            console.error('Error updating invoice status:', error);
        }
    };

    return (
        <select
            value={status}
            onChange={handleChange}
            style={{ fontSize: "12px", padding: "5px 5px", borderRadius: "5px" }}
        >
            {invoiceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};
const MyCellRenderer = ({ id, }: { id: any, }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState(false);
    const [roleId, setRoleId] = useState<string | null>(null);
    const [rolesData, setRolesData] = useState(null);
    const { data: roleDetails, refetch } = useGetRoleQuery();
    const pathname = usePathname();

    const { data: roles, error, isLoading, refetch: fetchRolesList } = useGetRoleQuery();

    const [getRole, { data: roleData, isSuccess: C_success, isError: C_error, isLoading: getRoleLoading, }] = useGetRoleByIdMutation();

    const [deleteRole, { isSuccess: roleDeleteSuccess, isError: roleDeleteError, error: roleDeleteErrorObject }] = useDeleteRoleMutation();

    useEffect(() => {
        dispatch(setRoleData(roleData));
    }, [roleData, dispatch, C_success])

    useSnackbarNotifications({
        error: roleDeleteError,
        errorMessage: 'Error deleting role',
        success: roleDeleteSuccess,
        successMessage: 'Role deleted successfully',
        errorObject: roleDeleteErrorObject,
    })

    const handleModalClose = () => {
        setOpenModal(false);
        refetch();
    };
const handleModalOpen = async () => {
  setOpenModal(true);
  try {
    await getRole(id);
   } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

    const handleEditClick = async () => {
        try {
            const response = await getRole(id);
            console.log("response", response)
            if ('data' in response) {
                const roleData = response.data;
                await dispatch(setRoleData(roleData));
               // setOpenModal(true);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    const handleDeleteClick = () => {
        if (id) {
            const confirmed = window.confirm("Are you sure you want to delete this role?");
            if (confirmed) {
                deleteRole(id);
                refetch();
            }
        }
    };

    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          sx={{ padding: "3px" }}
          aria-label=""
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
          aria-label=""
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
        {/* <DialogBoxUi
                open={openModal}
                content={<RoleForm onClose={handleModalClose} RolesEditInitialValues={roleData} HeaderName="Update Role" RolesFields={RolesEditFields}/>}
                handleClose={handleModalClose}
            /> */}
        <IconButton
          sx={{ padding: "3px" }}
          aria-label=""
          onClick={handleModalOpen}
        >
          <RemoveRedEyeOutlined
            sx={{
              color: `grey.500`,
              fontSize: "15px",
              "&:hover": { color: "blue" },
            }}
            fontSize="small"
          />
        </IconButton>
        <ModalUi topHeight="90%" open={openModal} onClose={handleModalClose}>
          <TableHeader headerName="User Details" />
          <Box sx={{ marginTop: "15px" }}>
            <CustomerDetails details={roleData || []} />
          </Box>
        </ModalUi>{" "}
      </Stack>
    );

}

export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => {
            const id = params.row.id;
            return <MyCellRenderer id={id} />;
        }
    },
    {
        field: 'userName',
        headerName: 'User Name',
        width: 150,
        editable: false,
    },
    {
        field: 'userEmail',
        headerName: 'Email',
        width: 150,
        editable: false,
    },
    {
        field: 'userRole',
        headerName: 'User Role',
        width: 120,
        editable: false,

    },
];