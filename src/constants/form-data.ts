interface TextField {
  type: 'text' | 'number';
  value: any;
  error: string;
  fullWidth: boolean;
  label: string;
  onChange: (value: string) => void;
  helperText: string;
}

interface DropdownField {
  type: 'dropdown';
  value: string;
  options: string[];
  error: string;
  fullWidth: boolean;
  label: string;
  onChange: (value: string) => void;
  helperText: string;
}

// Define the InputObject type using union type
type InputObject = {
  [key: string]: TextField | DropdownField;
};

// Define inputObject with proper structure
const inputObjects: InputObject = {
  email: {
    type: 'text',
    value: '',
    error: '',
    fullWidth: false,
    label: 'email',
    onChange: (value: string) => {},
    helperText: '',
  },
  phoneNumber: {
    type: 'number',
    value: '',
    error: '',
    fullWidth: false,
    label: 'phoneNumber',
    onChange: (value: string) => {}, 
    helperText: '',
  },
  movies: {
    type: 'dropdown',
    options: ['Option 1', 'Option 2'],
    value: '',
    error: '',
    fullWidth: false,
    label: 'movies',
    onChange: (value: string) => {},
    helperText: '',
  },
};

export default inputObjects;
