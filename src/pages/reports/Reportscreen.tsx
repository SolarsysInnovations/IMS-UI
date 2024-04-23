import React from 'react';
import { useNavigate } from "react-router-dom";
import usePathname from "../../hooks/usePathname";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import TableHeader from "../../../src/components/layouts/TableHeader";
import { Add } from "@mui/icons-material";
import DescriptionIcon from '@mui/icons-material/Description';

const Reportscreen: React.FC = () => {
    const pathname = usePathname();
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Button clicked');

    };
    return (
        <div>
              <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                        ]} />
        <Grid container spacing={2}>
            <Grid item xs="auto">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<InfoIcon/>}
                    onClick={handleClick}
                >
                    AR Aging Summary
                </Button>
                </Grid>
            <Grid item xs="auto">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<DescriptionIcon/>}
                    onClick={handleClick}
                >
                   Invoice Detail Summary
                </Button>
            </Grid>
        </Grid>
    
        </div>
    );
};

export default Reportscreen;
