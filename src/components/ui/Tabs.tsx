import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import palette from '../../theme/create-pallet';
interface TabData {
    value: string;
    label: string;
}
interface ColorTabsProps {
    tabs?: TabData[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    textColor?: any
    ariaLabel?: string;
    indicatorColor?: any
}

const TabUi: React.FC<ColorTabsProps> = ({
    tabs = [],
    defaultValue = tabs[0]?.value || '',
    onChange = () => { },
    textColor,
    indicatorColor,
    ariaLabel = 'tabs',
}) => {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        onChange(newValue);
    };
    return (
        <Box sx={{ width: '100%', }}>
            <Tabs
                sx={{
                    minHeight: "39px"
                }}
                value={value}
                onChange={handleChange}
                textColor={textColor}
                indicatorColor={indicatorColor}
                aria-label={ariaLabel}
            >
                {tabs.map(tab => (
                    <Tab sx={{
                        padding: "3px  10px"
                    }} key={tab.value} value={tab.value} label={tab.label} />
                ))}
            </Tabs>
        </Box>
    );
}

export default TabUi;
