import React from 'react';
import { styled } from '@mui/material/styles';
import MainLayout from './SideBar';


const LayoutRoot = styled('div')(({ theme }) => ({
}));


export const Layout = ({ children }: any) => {
    return (
        <LayoutRoot>
            <MainLayout>
                {children}
            </MainLayout>
        </LayoutRoot>
    );
};
