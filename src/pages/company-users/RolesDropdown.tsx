import React, { useEffect, useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  useGetRoleQuery,
  useUpdateRoleMutation,
} from '../../redux-store/role/roleApi';

const invoiceOptions = ['ADMIN', 'APPROVER', 'ENDUSER'];

const RolesDropdown = ({ params }: { params: GridRenderCellParams }) => {
  const [status, setStatus] = useState(params.value);
  const [updateRoles, { isSuccess: updateSuccess }] = useUpdateRoleMutation();
  const {
    data: rolesList,
    error,
    isLoading,
    refetch: fetchRolesList,
  } = useGetRoleQuery();

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
      const response = await updateRoles({
        id: updatedRoles.id,
        data: updatedRoles,
      });
      if ('error' in response) {
        console.error('Error updating invoice status:', response.error);
      } else {
      }
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      style={{ fontSize: '12px', padding: '5px 5px', borderRadius: '5px' }}
    >
      {invoiceOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default RolesDropdown;
