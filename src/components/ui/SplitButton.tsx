import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface SplitButtonProps {
    options: string[];
    defaultIndex?: number;
    disabledOptions?: number[];
    onOptionClick?: (option: string, index: number) => void;
    buttonStyles?: React.CSSProperties;
    menuStyles?: React.CSSProperties;
}

const SplitButton: React.FC<SplitButtonProps> = ({
    options,
    defaultIndex = 0,
    disabledOptions = [],
    onOptionClick,
    buttonStyles,
    menuStyles,
}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex);

    const handleClick = () => {
        if (onOptionClick) {
            onOptionClick(options[selectedIndex], selectedIndex);
        }
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
        if (onOptionClick) {
            onOptionClick(options[index], index);
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                sx={{ boxShadow: "none", }}
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
            >
                <Button
                    sx={{
                        padding: "1px 15px !important",
                        borderRadius: "5px",
                        fontSize: "12px",
                        ...buttonStyles,
                    }}
                    onClick={handleClick}
                >
                    {options[selectedIndex]}
                </Button>
                <Button
                    sx={{
                        padding: "1px 3px !important",
                        borderRadius: "5px",
                        fontSize: "12px",
                        ...buttonStyles,
                    }}
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                    borderRadius: "5px !important",
                    minWidth: "30px !important",
                    ...menuStyles,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            sx={{
                                                fontSize: "13px !important"
                                            }}
                                            key={option}
                                            disabled={disabledOptions.includes(index)}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default SplitButton;
