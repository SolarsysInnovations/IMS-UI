import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import { StepConnector, stepConnectorClasses } from '@mui/material';

// Define a custom StepIcon component
const CustomStepIcon: React.FC<StepIconProps & { status?: string }> = (props) => {
    const { active, completed, className, status } = props;

    // Determine background color based on status
    let backgroundColor = '#fff';
    if (status === 'DELETED' || status === 'RETURNED') {
        backgroundColor = '#ff4545';
    } else if (active) {
        backgroundColor = '#3f51b5';
    }

    return (
        <div
            className={className}
            style={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                borderRadius: '50%',
                border: '1px solid #ccc',
                backgroundColor,
                color: active ? '#fff' : '#000',
                transition: 'all 0.3s ease',
            }}
        >
            {props.icon}
        </div>
    );
};

// Define a custom connector component
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 6px)',
        right: 'calc(50% + 30px)',
    },

    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#eaeaf0',
        borderTopWidth: 2,
        borderRadius: 1,
        transition: 'border-color 0.3s ease',
    },
}));

type StagesType = {
    stage1?: string;
    stage2?: string;
    stage3?: string;
    stage4?: string;
    stage5?: string;
    stage6?: string;
}

interface StageStepperProps {
    stages: StagesType;
}

const StageStepper: React.FC<StageStepperProps> = ({ stages }) => {
    const isStepFailed = (step: number) => {
        // Check if the step status is "DELETED" or "RETURNED"
        const status = Object.values(stages)[step];
        return status === "DELETED" || status === "RETURNED";
    };

    const getActiveStep = () => {
        // Determine the active step based on the presence of stages
        if (stages.stage1 && stages.stage1 !== "null") return 0;
        if (stages.stage2 && stages.stage2 !== "null") return 1;
        if (stages.stage3 && stages.stage3 !== "null") return 2;
        if (stages.stage4 && stages.stage4 !== "null") return 3;
        if (stages.stage5 && stages.stage5 !== "null") return 4;
        if (stages.stage6 && stages.stage6 !== "null") return 5;
        return -1; // If no stages are present
    };

    const activeStep = getActiveStep();
    const defaultStageNames = ["DRAFT", "PENDING", "APPROVED", "PAID", "RETURNED", "DELETED"];
    const stageLabels = Object.keys(stages).map((key, index) => stages[key as keyof StagesType] !== "null" ? stages[key as keyof StagesType] : defaultStageNames[index]);

    return (
        <Box sx={{ width: '100%', backgroundColor: "white" }}>
            <Stepper activeStep={activeStep} connector={<QontoConnector />} alternativeLabel>
                {stageLabels.map((label, index) => {
                    const status = Object.values(stages)[index];
                    const isFailed = status === "DELETED" || status === "RETURNED";
                    const labelProps: { optional?: React.ReactNode; error?: boolean; } = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography sx={{ fontSize: '9px', whiteSpace: 'nowrap' }} variant="caption" color="error"> Alert message</Typography>
                        );
                        labelProps.error = true;
                    }

                    return (
                        <Step sx={{ margin: "0 10px", width: "50px" }} key={index} active={stages[`stage${index + 1}` as keyof StagesType] !== "null"}>
                            <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} status={status} />} {...labelProps}>
                                <Typography variant="body2" sx={{ fontSize: '10px' }}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default StageStepper;
