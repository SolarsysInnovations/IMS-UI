import React from 'react';
import MainLayout from './SideBar';


export const Layout = ({ children }: any) => {
    return (
        <MainLayout  >
            {children}
        </MainLayout>
    );
};
