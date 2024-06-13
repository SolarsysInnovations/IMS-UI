import React from 'react';
import { styled } from '@mui/material/styles';
import MainLayout from './SideBar';


export const Layout = ({ children }: any) => {
    return (
        <MainLayout  >
            {children}
        </MainLayout>
    );
};
