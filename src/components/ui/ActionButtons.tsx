import React from 'react';
import { Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GridDeleteIcon } from '@mui/x-data-grid';
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined';
import StyledIconButton from './IconButton';

interface ActionButtonsProps {
    id?: any;
    canDelete?: boolean;
    canEdit?: boolean;
    canView?: boolean;
    onEditClick: () => void;
    onDeleteClick: () => void;
    onViewClick?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ canEdit, canView, id, canDelete, onEditClick, onDeleteClick, onViewClick }) => {

    return (
        <Stack direction="row" spacing={1}>
            <StyledIconButton disabled={!canEdit} aria-label="edit" onClick={onEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </StyledIconButton>
            <StyledIconButton disabled={!canDelete} aria-label="delete" onClick={onDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </StyledIconButton>
            {onViewClick && (
                <StyledIconButton disabled={!canView} aria-label="view" onClick={onViewClick}>
                    <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
                </StyledIconButton>
            )}
        </Stack>
    )
};

export default ActionButtons;
