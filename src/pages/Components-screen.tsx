import React from 'react';
import ButtonUi from '../components/ui/Button';
import TextFieldLarge from '../components/ui/TextFieldLarge';
import { Stack } from '@mui/material';
import TextFieldUi from '../components/ui/TextField';
import AutoCompleteSelectUi from '../components/ui/AutoCompleteSelectUi';
import CheckboxesUi from '../components/ui/Checkbox';
import BadgeIconUi from '../components/ui/BadgeIcon';
import TextAreaUi from '../components/ui/TextArea';
import TimePickerUi from '../components/ui/Time Picker';
import DateTimePickerUi from '../components/ui/DateTimePicker';
import ButtonSmallUi from '../components/ui/ButtonSmall';
import SearchBarUi from '../components/ui/SearchBar';

const ComponentsScreen = () => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={3} sx={{ mb: 4, mt: 4 }}>
      <SearchBarUi />
      <ButtonUi variant="contained" />
      <ButtonSmallUi size="small" variant="contained" />
      <ButtonSmallUi size="small" variant="outlined" />
      <TextFieldLarge label="Text Field" />
      <TextFieldUi type="text" label="small text field" />
      <AutoCompleteSelectUi />
      <CheckboxesUi
        label="label here"
        checked={checked}
        onChange={handleChange}
      />
      <BadgeIconUi />
      <TextAreaUi />
      <TimePickerUi />
      <DateTimePickerUi />
    </Stack>
  );
};

export default ComponentsScreen;
