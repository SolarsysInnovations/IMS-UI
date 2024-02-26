import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import palette from '../../theme/create-pallet';

// Define the interface for tab data
interface TabData {
    value: string;
    label: string;
}

// Define props interface for TabsUI component
interface ColorTabsProps {
    tabs?: TabData[]; // Array of tab data
    defaultValue?: string; // Default selected tab value
    onChange?: (value: string) => void; // Event handler for tab change
    textColor?: any // Text color for tabs
    ariaLabel?: string; // Aria label for accessibility
    indicatorColor?: any
}

const TabUi: React.FC<ColorTabsProps> = ({
    tabs = [],
    defaultValue = tabs[0]?.value || '',
    onChange = () => { }, // Default empty function for onChange
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
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor={textColor}
                indicatorColor={indicatorColor}
                aria-label={ariaLabel}
            >
                {tabs.map(tab => (
                    <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
            </Tabs>
        </Box>
    );
}

export default TabUi;
